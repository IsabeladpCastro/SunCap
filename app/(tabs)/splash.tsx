import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importação do pacote de ícones

export default function App() {
  return (
    <>
      <ScrollView style={styles.container}>

        {/* Header */}
        <Text style={styles.header}>SUNCAP</Text>

        {/* Welcome */}
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>Boas-vindas ao SunCap!</Text>
        </View>
        <View>
          <Text style={styles.welcomeText}>
            Tenha informações precisas sobre a radiação solar na sua localização, ajudando você a proteger sua saúde e aproveitar o sol com segurança.
          </Text>
        </View>

        {/* Funcionalidades */}
        <View>
          <Text style={styles.welcomeText}>Veja como funciona:</Text>
        </View>

        {/* Funcionalidade 1 */}
        <View style={styles.funcionalidadeContainer}>
          <Icon name="sunny-outline" size={24} color="#0A6ACB" style={styles.icon} />
          <View style={styles.flex_linha}>
            <Text style={styles.funcionalidadeTitle}>Verifique a radiação solar</Text>
            <Text style={styles.funcionalidadeText}>Acompanhe o índice UV em tempo real na sua região.</Text>
          </View>
        </View>

        {/* Funcionalidade 2 */}
        <View style={styles.funcionalidadeContainer}>
          <Icon name="notifications-outline" size={24} color="#0A6ACB" style={styles.icon} />
          <View style={styles.flex_linha}>
            <Text style={styles.funcionalidadeTitle}>Receba alertas personalizados</Text>
            <Text style={styles.funcionalidadeText}>Saiba o melhor momento para se proteger ou aproveitar o sol.</Text>
          </View>
        </View>

        {/* Funcionalidade 3 */}
        <View style={styles.funcionalidadeContainer}>
          <Icon name="document-text-outline" size={24} color="#0A6ACB" style={styles.icon} />
          <View style={styles.flex_linha}>
            <Text style={styles.funcionalidadeTitle}>Dicas e relatórios</Text>
            <Text style={styles.funcionalidadeText}>Receba orientações para cuidados com a pele e análises detalhadas do histórico de exposição solar</Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Começar</Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
    width: Dimensions.get('window').width,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6600",
    marginVertical: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginVertical: 20,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: "#45525F",
    marginBottom: 12,
  },
  funcionalidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 0,
    paddingRight: 40,
  },
  flex_linha:{
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  funcionalidadeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  funcionalidadeText: {
    fontSize: 14,
    color: "#45525F",
  },
  connectButton: {
    backgroundColor: "#00063D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: -350,
    left: 0,
    right: 0,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
