import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from "expo-router";


export default function StartScreen (){
    const navigator = useNavigation();
    useEffect(() => {
        //Espera 3 segundos e navega para a tela inicial
        setTimeout(() => {
            navigator.navigate("SignIn" as never);//Garante que o usuário não volte para a splash
        }, 3000);
    }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoSunCap.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA10A',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

