import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../config";
import { storage } from "../utils/storage";

const MainMenu = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Usuario");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = await storage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (res.ok && data.infoPersonal) {
          const { nombre, apellido } = data.infoPersonal;
          setUserName(`${nombre} ${apellido}`);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserName();
  }, []);
  
  const handleLogout = async () => {
    await storage.removeItem("token");
    await storage.removeItem("userId");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Menú Principal</Text>
        <Text style={styles.welcomeMessage}>
          {loading ? "Cargando..." : `¡Hola ${userName}!`}
        </Text>
      </View>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButtonLarge}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Text style={styles.menuButtonText}>💪 Mi entrenador personal</Text>
        </TouchableOpacity>

        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={[styles.menuButtonSquare, styles.menuButtonSquareLeft]}
            onPress={() => navigation.navigate("RutinaViewer")}
          >
            <Text style={styles.menuButtonText}>📋 Mi Rutina</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuButtonSquare}
            onPress={() => navigation.navigate("DietaViewer")}
          >
            <Text style={styles.menuButtonText}>🍎 Mi Dieta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.menuButtonLarge}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.menuButtonText}>👤 Mi Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButtonSmall}
          onPress={handleLogout}
        >
          <Text style={styles.menuButtonText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  welcomeMessage: {
    fontSize: 18,
    color: "#E5E5EA",
  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuButtonLarge: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 32,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3A3A3C",
    width: "90%",
    minHeight: 78,
  },
  menuButtonSquare: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  menuButtonSquareLeft: {
    marginRight: 16,
  },
  menuGrid: {
    flexDirection: "row",
    marginBottom: 16,
    width: "90%",
    justifyContent: "center",
  },
  menuButtonSmall: {
    backgroundColor: "#3A3A3C",
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    width: "90%",
    minHeight: 60,
  },
  menuButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default MainMenu;

