import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Iconf from 'react-native-vector-icons/Feather';
import { useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Perfil(){
    const navigator = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() =>{console.log("teste"); navigator.navigate("Index" as never);}}>
            <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.header}>Perfil</Text>

      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Iconf name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>Usuário1</Text>
        <Text style={styles.userTag}>@Usuario1</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notificações</Text>
          <Iconf name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Ajuda</Text>
          <Iconf name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Sair</Text>
          <Iconf name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userTag: {
    fontSize: 14,
    color: '#888',
  },
  menu: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});

