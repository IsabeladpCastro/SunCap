import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importação do pacote de ícones
export default function App() {
  return (
    <>
      <ScrollView style={styles.container}>

               {/* Header */}
               <Text style={styles.header}>SUNCAP</Text>

                {/* Welcome */}
                <View style={styles.welcome}>
                  <Text style={styles.welcomeTitle}>Boas vindas ao SunCap</Text>
                </View>

                <View style={styles.welcomeText}>
                  <Text style={styles.welcomeText}>Tenha informações precisas sobre a radiação solar na sua localização, ajudando você a proteger sua saúde e aproveitar o sol com segurança.</Text>
                </View>

                <View style={styles.welcomeText}>
                  <Text style={styles.welcomeText}>Veja como funciona:</Text>
                </View>

                        {/*Funcionalidades */}
                        <View style={styles.funcionalidadeTitle}>
                  <Text style={styles.funcionalidadeTitle}>Verifique a radiação solar</Text>
                </View>
                <View style={styles.funcionalidadeText}>
                  <Text style={styles.funcionalidadeText}>Acompanhe o índice UV em tempo real na sua região.</Text>
                </View>

                <View style={styles.funcionalidadeTitle}>
                  <Text style={styles.funcionalidadeTitle}>Receba alertas personalizados</Text>
                </View>
                <View style={styles.funcionalidadeText}>
                  <Text style={styles.funcionalidadeText}>Saiba o melhor momento para se proteger ou aproveitar o sol.</Text>
                </View>

                <View style={styles.funcionalidadeTitle}>
                  <Text style={styles.funcionalidadeTitle}>Dicas e relatórios</Text>
                </View>
                <View style={styles.funcionalidadeText}>
                  <Text style={styles.funcionalidadeText}>Receba orientações para cuidados com a pele e análises detalhadas do histórico de exposição solar</Text>
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
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
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
  funcionalidadeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  funcionalidadeText: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#45525F",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#45525F",
    marginBottom: 12,
  },
  connectButton: {
    backgroundColor: '#00063D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  
});
