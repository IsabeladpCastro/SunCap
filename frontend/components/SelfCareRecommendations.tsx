import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontFamilyDefault } from "@/assets/fonts/default_font";

interface Props {
  uv_incidence: number;
}

const SelfCareRecommendations: React.FC<Props> = ({ uv_incidence })  => {

  if(uv_incidence < 7){
    return null;
  }

  return (
    <View style={styles.recommendations}>
      <Text style={styles.recText}>
        ⚠️ Evite Exposição Direta: Busque por lugares cobertos ou de sombra
      </Text>
      <Text style={styles.recText}>
        🌞 Use Protetor Solar: Aplique protetor solar com FPS 30 ou superior
      </Text>
      <Text style={styles.recText}>
        💧 Hidratação Constante: Beba bastante água ao longo do dia para evitar desidratação
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendations: {
    backgroundColor: "#ffe5e5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  recText: {
    fontFamily: fontFamilyDefault,
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
});

export default SelfCareRecommendations;
