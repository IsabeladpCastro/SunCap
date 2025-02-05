import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { fontFamilyDefault } from "@/assets/fonts/default_font";
import { useNavigation } from "expo-router";
import SelfCareRecommendations from "@/components/SelfCareRecommendations";
import BottomNavBar from "@/components/BottomBar";


export default function App() {
  const weeklyHours = [5, 8, 10, 4, 8, 12, 0];
  const totalHours = weeklyHours.reduce((sum, hours) => sum + hours, 0);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>SUNCAP</Text>

            <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
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
              style={[
                styles.calendarItem,
                date.day === "Ter" && styles.activeCalendarItem,
                { width: 50, marginRight: 10 },
              ]}
            >
              <Text style={styles.hours}>{date.hours}</Text>
              <Text
                style={date.day === "Ter" ? styles.activeDay : styles.day}
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
            <Text style={styles.uvIndex}>9</Text>
            <View>
              <Text style={styles.uvNow}>Agora</Text>
              <Text style={styles.uvStatus}>Muito alto</Text>
            </View>
          </View> 
          <SelfCareRecommendations uv_incidence={9}/>  
        </View>

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
                <Text style={styles.barHours}>{hours}h</Text>
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
  calendar: {
    fontFamily: fontFamilyDefault,
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
    top: 7,
    position: 'fixed'
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
    overflow: "hidden",
  },
  barFilled: {
    position: "absolute",
    bottom: 0,
    width: 7,
    backgroundColor: "#00063D",
    borderRadius: 5,
  },
  barHours: {
    fontFamily: fontFamilyDefault,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color: "#333",
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
    fontFamily: fontFamilyDefault,
    fontSize: 12,
    color: "#333",
    marginTop: 5,   
  },
  navTextActive: {
    fontFamily: fontFamilyDefault,
    fontSize: 12,
    color: "#007bff",
    marginTop: 5,
    fontWeight: "bold",
  },
});