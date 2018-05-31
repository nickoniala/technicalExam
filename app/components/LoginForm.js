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
    render() {
        return (
            <KeyboardAvoidingView style={{flex:1, justifyContent:'space-evenly'}} behavior="padding">
                <View>
                    <Image
                        source={require('../images/logo.png')}
                    />
                </View>
                <View>
                    <Text style={styles.formLabel}>
                        Email
                    </Text>
                    <TextInput
                        style={[styles.formInput, {marginBottom: 10}]}
                        placeholder="Input email address"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={styles.formLabel}>
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
                        onPress={() => {}}
                    >
                        <Text
                            style={styles.formButtonText}
                        >
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