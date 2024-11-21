import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const logo = require('../../assets/images/ldr_logo.png');
  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
  });

  // Atualiza os dados do formulário
  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Envia os dados para o backend
  const handleSubmit = async () => {
    console.log('handleSubmit invocado com sucesso');
  
    if (!data.email.trim() || !data.password.trim()) {
      console.log('Campos vazios.');
      alert('Preencha os campos vazios.');
      return;
    }
  
    try {
      console.log('Enviando dados para o servidor:', data);
  
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('Resposta:', response);
  
      const result = await response.json();
      console.log('Dados do servidor:', result);
  
      if (response.ok) {
        const { user } = result;
  
        if (user?.token) {
          console.log('Token do usuário:', user.token);
          await AsyncStorage.setItem('@authToken', user.token);
          router.push('/home');

        } else {
          Alert.alert('Erro', 'Token não recebido.');
        }
      } else {
        console.log('Erro no servidor:', result.message);
        Alert.alert('Erro', result.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro, Não foi possível conectar ao servidor.');
    }
  };
 
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
       
          
          <TextInput
            placeholder="Email"
            value={data.email}
            onChangeText={(value) => handleChange('email', value)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            value={data.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            style={styles.input}
          />
         
         <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

  
        <Text style={styles.accText}>Não possui uma conta? <TouchableOpacity onPress={() => router.replace('/register')}>
        <Text style={styles.accText2}>Crie agora!</Text>
        </TouchableOpacity>
        </Text>
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
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      color: '#b9272c',
      fontSize: 16,
      marginTop: 10,
    },
    accText: {
      color: '#b9272c',
      fontSize: 16,
      marginTop: 10,
    },
    accText2: {
      color: '#b9272c',
      fontSize: 16,
      marginTop: 10,
      fontWeight: '900',
    }
  });
  
