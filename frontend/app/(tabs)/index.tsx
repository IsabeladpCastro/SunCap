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
  const weeklyHours = [5, 8, 10, 4, 8, 12, 0];
  const totalHours = weeklyHours.reduce((sum, hours) => sum + hours, 0);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>SUNCAP</Text>

        {/* Calendar */}
        <View style={styles.calendar}>
          {[
            { day: "Seg", hours: 13 },
            { day: "Ter", hours: 7 },
            { day: "Qua", hours: 8 },
            { day: "Qui", hours: 9 },
            { day: "Sex", hours: 10 },
            { day: "Sáb", hours: 11 },
            { day: "Dom", hours: 12 },
          ].map((date, index) => (
            <TouchableOpacity
              key={index}
              style={
                date.day === "Ter"
                  ? [styles.calendarItem, styles.activeCalendarItem]
                  : styles.calendarItem
              }
            >
              <Text style={styles.hours}>{date.hours}</Text>
              <Text
                style={
                  date.day === "Ter" ? styles.activeDay : styles.day
                }
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.dashboardTitle}>Dashboard de Incidência UV</Text>
   
        <View style={styles.dashboard}>
          <View style={styles.uvInfo}>
            <Icon name="sunny" size={40} color="#FFD700" />
            <Text style={styles.uvIndex}>9</Text>
            <View>
              <Text style={styles.uvNow}>Agora</Text>
              <Text style={styles.uvStatus}>Muito alto</Text>
            </View>
          </View>
          <View style={styles.recommendations}>
            <Text style={styles.recText}>
              ⚠️ Evite Exposição Direta: Busque por lugares cobertos ou de sombra
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

        {/* Weekly Data */}
        <View style={styles.weeklyData}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyTitle}>Exposição semanal:</Text>
            <Text style={styles.totalHours}>{totalHours}h</Text>
          </View>
          <View style={styles.chart}>
            {weeklyHours.map((hours, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.barFilled,
                      { height: (hours / 24) * 100 },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="wifi" size={24} color="#333" />
          <Text style={styles.navText}>Conectar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#007bff" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6600",
    marginBottom: 20,
    textAlign: "left",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    position: "absolute",
    top: 5, // Ajuste para ficar no topo
  },
  day: {
    fontSize: 12,
    color: "#333",
    position: "absolute",
    bottom: 5,
  },
  activeDay: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    bottom: 5,
  },
  dashboard: {
    backgroundColor: "#fff",
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
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },
  uvIndex: {
    fontSize: 48,
    color: "#000",
    marginRight: 200,
  },
  uvInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  uvNow: {
    fontSize: 14,
    color: "#0A6ACB",
    textAlign: "right",
    padding: 5
  },
  uvStatus: {
    fontSize: 16,
    color: "#000",
    textAlign: "right",
  },
  recommendations: {
    backgroundColor: "#ffe5e5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  recText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  weeklyData: {
    backgroundColor: "#E5F0FF",
    padding: 25,
    borderRadius: 12,
    marginBottom: 20,
  },
  weeklyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weeklyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalHours: {
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
    width: 14,
    height: 120,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFilled: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  navTextActive: {
    fontSize: 12,
    color: "#007bff",
    marginTop: 5,
    fontWeight: "bold",
  },
});
