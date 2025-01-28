import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import dbService from "../../services/dbService"; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamilyDefault } from '@/assets/fonts/default-font';

const { width: screenWidth } = Dimensions.get("window");

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigator = useNavigation();

  const handleLogin = async () => {
    try {
      const usuario = await dbService.loginUsuario(email, senha);
      if (usuario) {
        console.log('Usuário logado:', usuario);
        if(usuario.id === 0){
          navigator.navigate('SecondSunLoading' as never);
        }else{
          navigator.navigate('Splash' as never);
        }
      } else {
        setError('Email ou senha incorretos.');
      }
    } catch (error) {
      setError('Ocorreu um erro ao tentar fazer login.');
      console.error('Erro no login:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerImage}>
        <Image source={require('../../assets/images/not-found.png')} style={styles.image} />
      </View>

      <Text style={styles.title}>Faça seu Login!</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        placeholderTextColor="#ddd" 
        value={email}
        onChangeText={setEmail} 
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Senha"
          placeholderTextColor="#ddd"
          secureTextEntry={!showPassword}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Image source={require('../../assets/images/hide-password.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.link}>Esqueceu sua senha?</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <View style={styles.notRegisteredContainer}>
        <Text style={styles.notRegisteredText}>Não tem uma conta? </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink} onPress={() => navigator.navigate("SignUp" as never)}>Cadastrar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: fontFamilyDefault,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
    paddingHorizontal: 34,
    justifyContent: "center",
  },
  headerImage: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: screenWidth,
    height: Dimensions.get('screen').height * 0.35,
    resizeMode: "cover",
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 24,
    color: "#000",
    fontFamily: fontFamilyDefault,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontFamily: fontFamilyDefault,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputField: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: fontFamilyDefault,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  link: {
    fontSize: 14,
    justifyContent: "flex-end",
    color: "#0056b3",
    textDecorationLine: "none",
    marginBottom: 10,
    fontFamily: fontFamilyDefault,
  },
  notRegisteredContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  notRegisteredText: {
    fontSize: 14,
    color: "#555555",
    fontFamily: fontFamilyDefault,
  },
  registerLink: {
    fontSize: 14,
    color: "#0056b3",
    textDecorationLine: "none",
    fontFamily: fontFamilyDefault,
  },
  button: {
    backgroundColor: "#001f54",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: fontFamilyDefault,
  },    
});
