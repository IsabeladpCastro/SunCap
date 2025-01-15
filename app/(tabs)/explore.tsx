import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BluetoothScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conexão_Bluetooth</Text>
      </View>

      {/* Bluetooth Icon */}
      <View style={styles.bluetoothContainer}>
        <View style={styles.bluetoothCircle}>
          <Icon name="bluetooth" size={48} color="#fff" />
        </View>
        <Text style={styles.bluetoothText}>Conectar com o Boné</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Conectar</Text>
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
  },
  connectButton: {
    backgroundColor: '#000080',
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});

