
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function HomeScreen() {
  const logo = require('../assets/images/ldr_logo.png');

  return (
    <View style={styles.container}>
      <Image
        source={logo} // Substitua pela URL da sua logo ou adicione uma logo local
        style={styles.logo}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => {
          router.replace('/login')}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
          router.replace('/register')}} >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff9eb',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#b9272c',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#b9272c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  }
});

