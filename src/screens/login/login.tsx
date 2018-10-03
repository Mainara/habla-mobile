import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import firebase from 'firebase';

export default class LoginScreen extends React.Component<{}, LoginState> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = { loading: false, credentials: {} };
    }

    render() {
        return (
            <View style={styles.page.container}>
                <Text style={styles.login.headerText}>Habla!</Text>
                <TextInput placeholder="Email"
                           style={styles.login.input}
                           editable={!this.state.loading}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           autoCapitalize="none"
                           onChangeText={text => this.setState({ credentials: { ...this.state.credentials, email: text }})}></TextInput>
                <TextInput placeholder="Password"
                           style={styles.login.input}
                           editable={!this.state.loading}
                           secureTextEntry={true}
                           onChangeText={text => this.setState({ credentials: { ...this.state.credentials, password: text }})}></TextInput>
                <TouchableOpacity style={styles.login.loginButton}
                                  onPress={this.login}
                                  disabled={this.state.loading}
                                  activeOpacity={1}>
                    {this.state.loading? 
                          (<ActivityIndicator color="white"
                                              size="small"/>)
                        : (<Text style={styles.login.loginButtonText}>Sign in</Text>) }
                </TouchableOpacity>
                <KeyboardSpacer/>
            </View>
        )
    }

    login = async() => {
        this.setState({ loading: true });

        try {
          await firebase.auth().signInWithEmailAndPassword(this.state.credentials.email, this.state.credentials.password);
        } catch (error) {
          this.setState({ loading: false });
          console.log(error);
        }
    };
}

interface LoginState {
    loading?: boolean;
    credentials?: { email?: string, password?: string };
}

const styles = {
    page: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            padding: 12
      }
    }),
    login: StyleSheet.create({
        headerText: {
            fontSize: 50,
            marginBottom: 10,
            color: "#795548"
        },
        input: {
            width: '100%',
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 14,
            paddingVertical: 14,
            marginBottom: 10,
            fontSize: 18,
        },
        loginButton: {
            paddingHorizontal: 14,
            paddingVertical: 14,
            backgroundColor: "#795548",
            width: '100%',
            borderRadius: 5
        },
        loginButtonText: {
            fontSize: 18,
            textAlign: 'center',
            color: "#FFFFFF",
            fontWeight: "bold"
        }
    })
}