import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TextInput,
    TouchableOpacity, 
    KeyboardAvoidingView,
    Alert,
    Animated,
    Keyboard,
    Platform
} from 'react-native';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            validEmail: true,
            validPassword: true,
            emailHasError: false,
            passwordHasError: false,
            emailErrorMsg: '',
            passwordErrorMsg: ''
        };
        this.imageHeight = new Animated.Value(207);
    }

    componentWillMount() {
        const keyboardPlatformOSShow = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const keyboardPlatformOSHide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this.keyboardShow = Keyboard.addListener(keyboardPlatformOSShow, this._keyboardShow.bind(this));
        this.keyboardHide = Keyboard.addListener(keyboardPlatformOSHide, this._keyboardHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardShow.remove();
        this.keyboardHide.remove();
    }

    _keyboardShow() {
        Animated.timing(this.imageHeight, {
            toValue: 100,
        }).start();
    };

    _keyboardHide() {
        Animated.timing(this.imageHeight, {
            toValue: 207,
        }).start();
    }

    _checkEmail(email) {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({email});

        if(email == '') {
            this.setState({
                validEmail: false,
                emailHasError: true,
                emailErrorMsg: 'email is required'
            });
        } else if(!reg.test(email)) {
            this.setState({
                validEmail: false,
                emailHasError: true,
                emailErrorMsg: 'not correct format for email address'
            });
        } else {
            this.setState({
                validEmail: true,
                emailHasError: false,
                emailErrorMsg: ''
            });
        }
    }

    _checkPassword(password) {
        this.setState({password});

        if(password == '') {
            this.setState({
                validPassword: false,
                passwordHasError: true,
                passwordErrorMsg: 'password is required'
            });
        } else if(password.length < 6 || password.length > 12) {
            this.setState({
                validPassword: false,
                passwordHasError: true,
                passwordErrorMsg: 'please use at least 6 - 12 characters'
            });
        } else {
            this.setState({
                validPassword: true,
                passwordHasError: false,
                passwordErrorMsg: ''
            });
        }
    }

    _onSubmit() {
        if(this.state.email == '' && this.state.password == '') {
            this.setState({
                validEmail: false,
                validPassword: false,
                emailHasError: true,
                passwordHasError: true,
                emailErrorMsg: 'email is required',
                passwordErrorMsg: 'password is required'
            });
        } else if(this.state.email == '') {
            this.setState({
                validEmail: false,
                emailHasError: true,
                emailErrorMsg: 'email is required'
            });
        } else if(this.state.password == '') {
            this.setState({
                validPassword: false,
                passwordHasError: true,
                passwordErrorMsg: 'password is required'
            });
        } else {
            this.setState({
                validEmail: true,
                validPassword: true,
                emailHasError: false,
                passwordHasError: false,
                emailErrorMsg: '',
                passwordErrorMsg: ''
            });
            Alert.alert('Login Success');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.formContainer} behavior='padding'>
                <View style={styles.formImage}>
                    <Animated.Image source={require('../images/logo.png')} style={{height: this.imageHeight}} resizeMode='contain' />
                </View>
                <View style={{marginVertical:15}}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>
                            Email
                        </Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={this._checkEmail.bind(this)}
                            value={this.state.email}
                            placeholder='Input email address'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                        />
                        {!this.state.validEmail?<Text style={{color:'#D21028',fontStyle:'italic'}}>{this.state.emailErrorMsg}</Text>:null}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>
                            Password
                        </Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={this._checkPassword.bind(this)}
                            value={this.state.password}
                            placeholder='Input password'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry
                        />
                        {!this.state.validPassword?<Text style={{color:'#D21028',fontStyle:'italic'}}>{this.state.passwordErrorMsg}</Text>:null}
                    </View>
                </View>
                <View style={{marginBottom:35}}>
                    <TouchableOpacity
                        style={styles.formButton}
                        onPress={this._onSubmit.bind(this)}
                        disabled={this.state.emailHasError || this.state.passwordHasError}
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
    formContainer: {
        flex: 1, 
        justifyContent: 'space-evenly', 
        alignItems: 'stretch',
        backgroundColor: '#FAF8FF',
    },
    formImage: {
        alignSelf: 'center',
        marginTop: 35,
        //marginBottom: 20,
    },
    formGroup: {
        marginBottom: 5,
        marginHorizontal: 15,
    },
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
        padding: 15,
        marginHorizontal: 15,
        alignItems: 'center',
    },
    formButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    }
});