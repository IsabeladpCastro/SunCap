import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>SUNCAP</Text>

        {/* Calendar */}
        <View style={styles.calendar}>
          {["06 Seg", "07 Ter", "08 Qua", "09 Qui", "10 Sex", "11 Sáb", "12 Dom"].map((date, index) => (
            <View
              key={index}
              style={[
                styles.calendarItem,
                date.includes("07") && styles.activeCalendarItem,
              ]}
            >
              <Text style={date.includes("07") ? styles.activeDate : styles.date}>
                {date}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>Dashboard de Incidência UV</Text>
          <View style={styles.uvInfo}>
            <Text style={styles.uvIndex}>9</Text>
            <View>
              <Text style={styles.uvNow}>Agora</Text>
              <Text style={styles.uvStatus}>Muito alto</Text>
            </View>
          </View>
          <View style={styles.recommendations}>
            <Text style={styles.recText}>
              🏠 Evite Exposição Direta: Busque por lugares cobertos ou de sombra
            </Text>
            <Text style={styles.recText}>
              🌞 Use Protetor Solar: Aplique protetor solar com FPS 30 ou superior
            </Text>
            <Text style={styles.recText}>
              💧 Hidratação Constante: Beba bastante água ao longo do dia para
              evitar desidratação
            </Text>
          </View>
        </View>

        <View style={styles.weeklyData}>
          <Text style={styles.weeklyTitle}>Últimos 7 dias: 47h</Text>
          <View style={styles.chart}>
            {[5, 8, 10, 4, 8, 12, 0].map((hours, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: hours * 10 }]} />
                <Text style={styles.barLabel}>{hours}</Text>
              </View>
            ))}
          </View>
        </View>
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
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  calendarItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  activeCalendarItem: {
    backgroundColor: "#007bff",
  },
  date: {
    fontSize: 12,
    color: "#333",
  },
  activeDate: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  dashboard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  uvInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  uvIndex: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffcc00",
    marginRight: 10,
  },
  uvNow: {
    fontSize: 14,
    color: "#555",
  },
  uvStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
  },
  recommendations: {
    backgroundColor: "#ffe5e5",
    padding: 15,
    borderRadius: 10,
  },
  recText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  weeklyData: {
    backgroundColor: "#e5f0ff",
    padding: 20,
    borderRadius: 10,
  },
  weeklyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  barContainer: {
    alignItems: "center",
  },
  bar: {
    width: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  barLabel: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#007bff",
    marginTop: 5,
  },
});
