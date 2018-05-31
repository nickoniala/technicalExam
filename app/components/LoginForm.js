import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TextInput,
    TouchableOpacity, 
    KeyboardAvoidingView 
} from 'react-native';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            validEmail: true,
            emailHasErrors: false,
            emailErrorMsg: '',
        };
    }

    _checkEmail(email) {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({email});

        if(email == '') {
            this.setState({
                validEmail: false,
                emailHasErrors: true,
                emailErrorMsg: 'email is required'
            });
        } else if(!reg.test(email)) {
            this.setState({
                validEmail: false,
                emailHasErrors: true,
                emailErrorMsg: 'not correct format for email address'
            });
        } else {
            this.setState({
                validEmail: true,
                emailHasErrors: false,
                emailErrorMsg: ''
            });
        }
    }

    _onSubmit() {
        if(this.state.email == '') {
            this.setState({
                validEmail: false,
                emailHasErrors: true,
                emailErrorMsg: 'email is required'
            });
        } else {
            this.setState({
                validEmail: true,
                emailHasErrors: false,
                emailErrorMsg: ''
            });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex:1, justifyContent:'space-evenly'}} behavior="padding">
                <View>
                    <Image source={require('../images/logo.png')} />
                </View>
                <View>
                    <Text style={[styles.formLabel, {marginTop:5}]}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={this._checkEmail.bind(this)}
                        value={this.state.email}
                        placeholder="Input email address"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {!this.state.validEmail?<Text style={{color:'#D21028',fontStyle:'italic'}}>{this.state.emailErrorMsg}</Text>:null}

                    <Text style={[styles.formLabel, {marginTop:5}]}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Input password"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.formButton}
                        onPress={this._onSubmit.bind(this)}
                        disabled={this.state.emailHasErrors}
                    >
                        <Text style={styles.formButtonText}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    formLabel: {
        color: '#363636',
        fontWeight: 'bold',
        fontSize: 18,
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#7D59C0',
        padding: 10,
    },
    formButton: {
        backgroundColor: '#7D59C0',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    formButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    }
});