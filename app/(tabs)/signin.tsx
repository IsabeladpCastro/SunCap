import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerImage}>
        <Image
          source={require('../../assets/images/not-found.png')} // Substitua pelo caminho correto da imagem
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Faça seu Login!</Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#ddd" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#ddd"   />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Senha"
          placeholderTextColor="#ddd"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconContainer}
        >
          <Image
            source={require('../../assets/images/hide-password.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.link}>Esqueceu sua senha?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <View style={styles.notRegisteredContainer}>
        <Text style={styles.notRegisteredText}>Não tem uma conta? </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>Cadastrar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
    paddingHorizontal: 34,
    paddingVertical: 36,
    justifyContent: "center",
  },
  headerImage: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: screenWidth,
    height: Dimensions.get('screen').height * 0.3,
    resizeMode: "cover",
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 24,
    color: "#000",
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
  },
  registerLink: {
    fontSize: 14,
    color: "#0056b3",
    textDecorationLine: "none",
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
  },    
});
