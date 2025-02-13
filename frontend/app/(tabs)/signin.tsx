import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { fontFamilyDefault } from '@/assets/fonts/default_font';
import { AuthProvider, useAuth } from "../../contexts/authContext";

const { width: screenWidth } = Dimensions.get("window");

// Definição de credenciais fixas
const CREDENCIAIS_FIXAS = {
  email: "admin@email.com",
  senha: "123456",
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const navigator = useNavigation();

  const handleLogin = () => {
    if (email === CREDENCIAIS_FIXAS.email && senha === CREDENCIAIS_FIXAS.senha) {
      setUser({
        id: 1, // ID fixo apenas para simular um usuário
        name: "Administrador",
        email: email,
        primeiro_acesso: 0,
      });

      navigator.navigate('SecondLoadingScreen' as never);
    } else {
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <AuthProvider>
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </AuthProvider>
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

