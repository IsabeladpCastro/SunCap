import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  uv_incidence: number;
}

const SelfCareRecommendations: React.FC<Props> = ({ uv_incidence }) => {
  const getRecommendations = () => {
    if (uv_incidence < 3) {
      return "🌞 Utilize óculos de Sol em dias claros.Recomenda-se o uso de proteção solar se você tiver a pele muito clara. Tempo para a pele começar a queimar: 60 minutos.";
    } else if (uv_incidence < 6) {
      return "🧢 Pequeno risco de queimadura se exposto ao Sol sem proteção. Atenção com as crianças. Utilize óculos de Sol e camisa, preferencialmente de manga longa. Tempo para a pele começar a queimar: 45 minutos.";
    } else if (uv_incidence < 8) {
      return "💧 Alto risco de queimadura se exposto ao Sol sem proteção. No rosto é recomendado o uso de protetor solar. Se voce tiver que sair use roupas leves e oculos de sol homologados. Hidrate-se constantemente. Tempo para a pele começar a queimar: 30 minutos.";
    } else if (uv_incidence < 11) {
      return "🕶️ Evite sair ao sol sem proteção. Prefira sombra e use chapéu, óculos escuros e protetor solar. Tempo para a pele começar a queimar: 30 minutos.";
    } else {
      return "⚠️ Risco extremo de queimadura! Evite sair ao sol perto do meio dia. Se necessário, use todas as proteções possíveis e busque abrigo na sombra. Tempo para a pele começar a queimar: 10 minutos.";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendações de Cuidado:</Text>
      <Text style={styles.recommendation}>{getRecommendations()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#FFF3E0",
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendation: {
    fontSize: 14,
    color: "#333",
  },
});

export default SelfCareRecommendations;
