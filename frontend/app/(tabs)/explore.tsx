import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { fontFamilyDefault } from '@/assets/fonts/default_font';

export default function BluetoothScreen() {
  const navigation = useNavigation();
  const [connected, setConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleConnect = () => {
    setConnected(true);
    setShowMessage(true);
    Alert.alert("Sucesso", "Boné conectado com sucesso!");

    // Oculta a mensagem após 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Index' as never)}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conexão Bluetooth</Text>
      </View>

      {/* Bluetooth Icon */}
      <View style={styles.bluetoothContainer}>
        <View style={styles.bluetoothCircle}>
          <Icon name="bluetooth" size={48} color="#fff" />
        </View>
        <Text style={styles.bluetoothText}>Conectar com o Boné</Text>
      </View>

      {/* Mensagem de sucesso */}
      {showMessage && <Text style={styles.successMessage}>Bluetooth conectado com sucesso!</Text>}

      {/* Botão */}
      <TouchableOpacity style={[styles.connectButton, connected && styles.connectedButton]} onPress={handleConnect}>
        <Text style={styles.connectButtonText}>
          {connected ? "Conectado" : "Conectar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
    fontFamily: fontFamilyDefault,
  },
  bluetoothContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluetoothCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bluetoothText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: fontFamilyDefault,
  },
  successMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fontFamilyDefault,
  },
  connectButton: {
    backgroundColor: '#000080',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  connectedButton: {
    backgroundColor: '#008000', // Verde quando conectado
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: fontFamilyDefault,
  },
});
