import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Apple } from 'lucide-react-native';
import { API_BASE } from "../config";
import { storage } from "../utils/storage";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const DietaViewer = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dieta, setDieta] = useState([]);

  const { showAlert, alertConfig } = useAlert();

  useEffect(() => {
    const loadUser = async () => {
      const id = await storage.getItem("userId");
      if (!id) {
        navigation.replace("Login");
        return;
      }
      setUserId(id);
    };
    loadUser();
  }, [navigation]);

  useEffect(() => {
    if (!userId) return;

    const fetchDieta = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo obtener la dieta");

        setDieta(Array.isArray(data?.dieta) ? data.dieta : []);
      } catch (e) {
        console.error(e);
        showAlert("error", "Error", "No se pudo cargar la dieta");
      } finally {
        setLoading(false);
      }
    };

    fetchDieta();
  }, [userId, showAlert]);

  const detectLineType = (linea) => {
    if (!linea || linea.trim() === "") return "empty";
    
    if (linea.match(/^🍎|^👤|^⚠️|^🎯|^⏰|^🍽️|^💡|^🩺|^💊|^💧|^📝|^📊/)) {
      return "main-title";
    }
    
    if (linea.match(/^DESAYUNO|^MEDIA MAÑANA|^ALMUERZO|^MERIENDA|^CENA/i)) {
      return "meal-title";
    }
    
    if (linea.match(/^[A-ZÁÉÍÓÚ\s]+:$/) && linea.length < 50) {
      return "section-subtitle";
    }
    
    if (linea.match(/^•|^\d+g|^\d+ml|^\d+ unidad|^\d+ cucharada/i)) {
      return "food-item";
    }
    
    if (linea.match(/macros aprox/i)) {
      return "macros-info";
    }
    
    if (linea.match(/^💪|^🔥|^✅|^❌|^⚠️|^📌/)) {
      return "tip-info";
    }
    
    return "normal";
  };

  const renderLine = (linea, idx) => {
    const type = detectLineType(linea);
    const styleMap = {
      "empty": styles.emptyLine,
      "main-title": styles.mainTitle,
      "meal-title": styles.mealTitle,
      "section-subtitle": styles.sectionSubtitle,
      "food-item": styles.foodItem,
      "macros-info": styles.macrosInfo,
      "tip-info": styles.tipInfo,
      "normal": styles.normalLine,
    };
    
    return (
      <Text key={idx} style={styleMap[type] || styles.normalLine}>
        {linea}
      </Text>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cargando dieta...</Text>
        </View>
        <ActivityIndicator size="large" color="#0A84FF" style={styles.loader} />
      </View>
    );
  }

  if (!dieta || dieta.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} strokeWidth={2} color="#0A84FF" />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Apple size={24} strokeWidth={2} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Mi Dieta</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay dieta disponible todavía. Ve a "Mi entrenador personal" para generar tu plan.
          </Text>
        </View>
        <CustomAlert {...alertConfig} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} strokeWidth={2} color="#0A84FF" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Apple size={24} strokeWidth={2} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Mi Dieta</Text>
        </View>
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.dietaContainer}>
          {dieta.map((linea, idx) => renderLine(linea, idx))}
        </View>
      </ScrollView>
      <CustomAlert {...alertConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#000000",
  },
  backButton: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButtonText: {
    color: "#0A84FF",
    fontSize: 16,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  dietaContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#E5E5EA",
    fontSize: 16,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A84FF",
    marginTop: 12,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
    marginBottom: 4,
  },
  foodItem: {
    fontSize: 14,
    color: "#E5E5EA",
    marginLeft: 8,
    marginBottom: 4,
  },
  macrosInfo: {
    fontSize: 14,
    color: "#8E8E93",
    fontStyle: "italic",
    marginLeft: 8,
    marginBottom: 4,
  },
  tipInfo: {
    fontSize: 14,
    color: "#E5E5EA",
    marginLeft: 8,
    marginBottom: 4,
  },
  normalLine: {
    fontSize: 14,
    color: "#E5E5EA",
    marginBottom: 4,
  },
  emptyLine: {
    height: 8,
  },
});

export default DietaViewer;

