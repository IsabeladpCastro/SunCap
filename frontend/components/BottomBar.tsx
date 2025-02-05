import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("BluetoothScreen" as never)}
      >
        <Icon name="wifi" size={24} color="#333" />
        <Text style={styles.navText}>Conectar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate('Index' as never)}}>
        <Icon name="home" size={24} color="#007bff" />
        <Text style={styles.navTextActive}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile" as never)}
      >
        <Icon name="person" size={24} color="#333" />
        <Text style={styles.navText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
