import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [userEmail, setUserEmail] = useState(""); // Estado compartilhado para o email do usuário

  // Tela de Login
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = () => {
      setUserEmail(email); // Atualiza o email do usuário
      setScreen("perfil"); // Navega para a tela de perfil
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Faça seu login!</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem cadastro? </Text>
          <TouchableOpacity onPress={() => setScreen("cadastro")}>
            <Text style={styles.registerLink}>Cadastre agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Tela de Cadastro
  const CadastroScreen = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [termosAceitos, setTermosAceitos] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Faça seu cadastro!</Text>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#B0B0B0"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#45525F" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setTermosAceitos(!termosAceitos)}
          >
            <Icon
              name={termosAceitos ? "checkbox-outline" : "square-outline"}
              size={20}
              color="#0A6ACB"
            />
          </TouchableOpacity>
          <Text style={styles.termosText}>
            Concordo com os <Text style={styles.link}>Termos de uso</Text> e
            <Text style={styles.link}> Políticas de Privacidade</Text>.
          </Text>
        </View>

        <TouchableOpacity style={styles.cadastrarButton} onPress={() => setScreen("login")}>
          <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Tela de Perfil
  const PerfilScreen = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profilePlaceholder}>
          <Icon name="person-circle-outline" size={100} color="#B0B0B0" />
        </View>
        <Text style={styles.profileName}>{userEmail || "Usuário1"}</Text>
        <Text style={styles.profileUsername}>@{userEmail.split("@")[0] || "Usuario1"}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="notifications-outline" size={20} color="#45525F" />
          <Text style={styles.menuText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle-outline" size={20} color="#45525F" />
          <Text style={styles.menuText}>Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setScreen("login")}>
          <Icon name="exit-outline" size={20} color="#45525F" />
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Alternar entre as telas
  return screen === "login" ? (
    <LoginScreen />
  ) : screen === "cadastro" ? (
    <CadastroScreen />
  ) : (
    <PerfilScreen />
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  forgotPassword: { color: "#0A6ACB", textAlign: "right", marginBottom: 20 },
  loginButton: { backgroundColor: "#0A6ACB", padding: 15, borderRadius: 5, alignItems: "center" },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  registerContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  registerText: { color: "#000" },
  registerLink: { color: "#0A6ACB", fontWeight: "bold" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  checkbox: { marginRight: 10 },
  termosText: { flex: 1 },
  link: { color: "#0A6ACB", textDecorationLine: "underline" },
  cadastrarButton: { backgroundColor: "#0A6ACB", padding: 15, borderRadius: 5, alignItems: "center" },
  cadastrarButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  profileContainer: { alignItems: "center", marginVertical: 30 },
  profileName: { fontSize: 20, fontWeight: "bold", marginVertical: 5 },
  profileUsername: { color: "#555" },
  menuContainer: { marginTop: 20 },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  menuText: { marginLeft: 10, fontSize: 16, color: "#45525F" },
});
