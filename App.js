import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginForm from './app/components/LoginForm';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
