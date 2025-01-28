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
import CheckBox from "expo-checkbox";
import dbService from "../../services/dbService";
import { useNavigation } from "@react-navigation/native";
import { fontFamilyDefault } from "@/assets/fonts/default-font";

const { width: screenWidth } = Dimensions.get("window");

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); 

  const navigator = useNavigation();

  const handleSubmit = async () => {
    if (!isChecked) {
      setMessage("Você deve aceitar os Termos de uso e Políticas de Privacidade.");
      setMessageColor("red");
      return;
    }

    if (!name || !email || !password) {
      setMessage("Todos os campos devem ser preenchidos.");
      setMessageColor("red");
      return;
    }

    try {
      const usuarioCriado = await dbService.createUsuario(name, email, password);

      console.log(usuarioCriado);

      navigator.navigate("Splash" as never); 

      setMessage(`Usuário ${name} cadastrado com sucesso!`);
      setMessageColor("green");
      setName("");
      setEmail("");
      setPassword("");
      setIsChecked(false);
    } catch (error) {
      setMessage("Não foi possível realizar o cadastro. Tente novamente.");
      setMessageColor("red");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerImage}>
        <Image
          source={require('../../assets/images/not-found.png')}
          style={styles.image}
        />
      </View>

      <Text style={[styles.title, { fontFamily: fontFamilyDefault }]}>Faça seu cadastro!</Text>

      <TextInput
        style={[styles.input, { fontFamily: fontFamilyDefault }]}
        placeholder="Nome"
        placeholderTextColor="#ddd"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { fontFamily: fontFamilyDefault }]}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputField, { fontFamily: fontFamilyDefault }]}
          placeholder="Senha"
          placeholderTextColor="#ddd"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputField, { fontFamily: fontFamilyDefault }]}
          placeholder="Confirmar senha"
          placeholderTextColor="#ddd"
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.iconContainer}
        >
          <Image
            source={require('../../assets/images/hide-password.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
          color="#001f94"
        />
        <Text style={[styles.checkboxText, { fontFamily: fontFamilyDefault }]}>
          Concordo que li e aceito todos os{" "}
          <Text style={styles.link}>Termos de uso</Text> e{" "}
          <Text style={styles.link}>Políticas de Privacidade</Text>.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { fontFamily: fontFamilyDefault }]}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.signinContainer}>
        <Text style={[styles.signinText, { fontFamily: fontFamilyDefault }]}>Já possui uma conta? </Text>
        <TouchableOpacity>
          <Text style={[styles.signinLink, { fontFamily: fontFamilyDefault }]} onPress={() => navigator.navigate("SignIn" as never)}>Acessar agora</Text>
        </TouchableOpacity>
      </View>

      {message ? (
        <Text style={[styles.message, { color: messageColor, fontFamily: fontFamilyDefault }]}>
          {message}
        </Text>
      ) : null}
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
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  signinText: {
    fontSize: 14,
    color: "#555555",
  },
  signinLink: {
    fontSize: 14,
    color: "#0056b3",
    textDecorationLine: "none",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  checkboxText: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  link: {
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
  message: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
});
