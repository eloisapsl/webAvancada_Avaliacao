import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';
import AuthGuard from '../middleware/AuthGuard';

type Post = {
    id: number;
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
    };
  };

export default function HomeScreen(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/posts');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Erro ao buscar posts:', error);
          Alert.alert('Erro', 'Não foi possível carregar os posts');
        } finally {
          setLoading(false);
        }
      };

      const renderPost = ({ item }: { item: Post }) => (

        <View style={styles.containerPost}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>Autor: {item.author.name}</Text>
        </View>
      );

      
    return(
        
        <AuthGuard>
            <View style={styles.container}>
            <FlatList 
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id.toString()}
            />
            </View>
            
        </AuthGuard>
        
    );

}


const styles = StyleSheet.create({
    containerPost: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#C2EABD',
        borderRadius: 8,
        alignItems:'center',
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 18,
    },
    container:{
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#fff9eb',
            padding: 20,
    }
});