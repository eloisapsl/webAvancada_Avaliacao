import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const logo = require('../../assets/images/ldr_logo.png');
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.password.trim() ||
      !data.confirmPassword.trim()
    ) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
  
    if (data.password !== data.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword, // Certifique-se que o nome coincide com o backend
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Erro ao registrar. Tente novamente.');
      }
  
      alert('Registro realizado com sucesso!');
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Algo deu errado, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={logo} // Substitua pela URL da sua logo ou adicione uma logo local
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"  
        placeholderTextColor="#999"
        keyboardType="default"
        autoCapitalize="none"
        value={data.name}
        onChangeText={(value) => handleChange('name', value)}
      />
       <TextInput
        style={styles.input}
        placeholder="Email"  
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={data.email}
          onChangeText={(value) => handleChange('email', value)}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={data.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={data.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
      
      <Text style={styles.accText}>Já possui uma conta? <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.accText2}>Fazer Login</Text>
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
