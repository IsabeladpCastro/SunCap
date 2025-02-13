import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { fontFamilyDefault } from "@/assets/fonts/default_font";
import SelfCareRecommendations from "@/components/SelfCareRecommendations";
import BottomNavBar from "@/components/BottomBar";
import { useAuth } from '@/contexts/authContext';

export default function App() {
  const [exposicoes, setExposicoes] = useState<number[]>([
    18000,  // Seg (5 horas)
    10800,  // Ter (3 horas)
    24400,  // Qua (4 horas)
    7200,   // Qui (2 horas)
    0,      // Qui (0 horas)
    14400,  // Sex (4 horas)
    21600,  // Sáb (6 horas)
    5400    // Dom (1.5 horas)
  ]);
  
  const [totalExposicao, setTotalExposicao] = useState<number>(0);
  const [mean_uv, setMeanUV] = useState<number[]>([
    6,  // Seg (UV Médio)
    8,  // Ter (UV Médio)
    7,  // Qua (UV Médio)
    5,  // Qui (UV Médio)
    9,  // Sex (UV Médio)
    7,  // Sáb (UV Médio)
    6   // Dom (UV Médio)
  ]);
  const [selectedDay, setSelectedDay] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    setTotalExposicao(exposicoes.reduce((sum, time) => sum + time, 0));
  }, [exposicoes]);

  const weeklyHours = useMemo(() => {
    return [
      { day: "Seg", date: 10, hours: exposicoes[0] / 3600 },
      { day: "Ter", date: 11, hours: exposicoes[1] / 3600 },
      { day: "Qua", date: 12, hours: exposicoes[2] / 3600 },
      { day: "Qui", date: 13, hours: exposicoes[3] / 3600 },
      { day: "Sex", date: 14, hours: exposicoes[4] / 3600 },
      { day: "Sáb", date: 15, hours: exposicoes[5] / 3600 },
      { day: "Dom", date: 16, hours: exposicoes[6] / 3600 },
    ];
  }, [exposicoes]);

  const calculateAverageUV = () => {
    if (mean_uv.length === 0) return 0;
    const sum = mean_uv.reduce((total, uv) => total + uv, 0);
    return Math.round(sum / mean_uv.length); 
  };
  

  const getUVForSelectedDay = () => {
    if (selectedDay) {
      const dayIndex = weeklyHours.findIndex(item => item.day === selectedDay);
      return mean_uv[dayIndex] || 0;
    }
    return calculateAverageUV(); 
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>SUNCAP</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {weeklyHours.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarItem,
                date.day === selectedDay && styles.activeCalendarItem,
                { width: 50, marginRight: 10 },
              ]}
              onPress={() => setSelectedDay(date.day === selectedDay ? "" : date.day)}
            >
              <Text style={styles.hours}>{date.date}</Text>
              <Text
                style={date.day === selectedDay ? styles.activeDay : styles.day}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.dashboardTitle}>Dashboard de Incidência UV</Text>

        <View style={styles.dashboard}>
          <View style={styles.uvInfo}>
            <Icon name="sunny" size={40} color="#FFD700" />
            <Text style={styles.uvIndex}>{getUVForSelectedDay()}</Text> 
            <View>
              <Text style={styles.uvNow}>{selectedDay !== "Seg" ? selectedDay : "Agora"}</Text>
              <Text style={styles.uvStatus}>
              {getUVForSelectedDay() > 8 ? "Muito alto" : "Moderado"} 
              </Text>
            </View>
          </View>
          <SelfCareRecommendations uv_incidence={getUVForSelectedDay()} />
        </View>

        <View style={styles.weeklyData}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyTitle}>Exposição semanal:</Text>
            <Text style={styles.totalHours}>{(totalExposicao / 3600).toFixed(1)} Horas</Text>
          </View>
          <View style={styles.chart}>
          {weeklyHours.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barBackground}>
                <View
                  style={[styles.barFilled, { height: (item.hours / 12) * 100 }]}
                />
              </View>
              <Text style={styles.barHours}>{item.hours.toFixed(1)}h</Text>
            </View>
          ))}
</View>

        </View>
      </ScrollView>

      <BottomNavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontFamily: fontFamilyDefault,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6600",
    marginBottom: 20,
    textAlign: "left",
  },
  calendarItem: {
    width: 53,
    height: 55,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    position: "relative",
  },
  activeCalendarItem: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  hours: {
    fontFamily: fontFamilyDefault,
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    position: "absolute",
    top: 5,
  },
  day: {
    fontFamily: fontFamilyDefault,
    fontSize: 12,
    color: "#333",
    position: "absolute",
    bottom: 5,
  },
  activeDay: {
    fontFamily: fontFamilyDefault,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    bottom: 5,
  },
  dashboard: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  dashboardTitle: {
    fontFamily: fontFamilyDefault,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },
  uvIndex: {
    fontFamily: fontFamilyDefault,
    fontSize: 48,
    color: "#000",
    right: 70,
    justifyContent: 'center',
  },
  uvInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  uvNow: {
    fontFamily: fontFamilyDefault,
    fontSize: 14,
    color: "#0A6ACB",
    textAlign: "right",
    padding: 5,
  },
  uvStatus: {
    fontFamily: fontFamilyDefault,
    fontSize: 16,
    color: "#000",
    textAlign: "right",
  },
  weeklyData: {
    backgroundColor: "#E5F0FF",
    padding: 25,
    borderRadius: 12,
    marginBottom: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  weeklyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weeklyTitle: {
    fontFamily: fontFamilyDefault,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalHours: {
    fontFamily: fontFamilyDefault,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barContainer: {
    alignItems: "center",
  },
  barBackground: {
    width: 7,
    height: 120,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  barFilled: {
    backgroundColor: "#00063D",
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  barHours: {
    fontFamily: fontFamilyDefault,
    fontSize: 10,
    color: "#333",
    marginTop: 5,
  },
});
