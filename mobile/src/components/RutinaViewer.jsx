import React, { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../config";
import { storage } from "../utils/storage";
import useAlert from "../hooks/useAlert";
import CustomAlert from "./CustomAlert";

const RutinaViewer = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const rutinaRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [rutina, setRutina] = useState([]);
  const [semanaActual, setSemanaActual] = useState(1);
  const [completandoSemana, setCompletandoSemana] = useState(false);

  const { alertConfig, showAlert, closeAlert } = useAlert();

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

    const fetchRutina = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo obtener la rutina");

        setRutina(Array.isArray(data?.rutina) ? data.rutina : []);
        setSemanaActual(data?.semanaActual || 1);
      } catch (err) {
        console.error(err);
        showAlert("error", "Error", "No se pudo cargar la rutina.");
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [userId, showAlert]);

  const handleCompletarSemana = () => {
    if (!userId) return;

    showAlert(
      "confirm",
      "Confirmar semana",
      semanaActual === 4
        ? "🎉 ¿Completaste la semana 4? Se iniciará un nuevo ciclo desde la semana 1."
        : `¿Completaste la semana ${semanaActual}? Se generará la rutina de la semana ${semanaActual + 1}.`,
      {
        confirmText: "Sí, completar",
        cancelText: "Cancelar",
        onConfirm: confirmarCompletarSemana,
      }
    );
  };

  const confirmarCompletarSemana = async () => {
    closeAlert();
    setCompletandoSemana(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/users/${userId}/completar-semana`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al generar nueva rutina");
      }

      setRutina(Array.isArray(data.rutina) ? data.rutina : []);
      setSemanaActual(data.semanaActual);

      rutinaRef.current?.scrollTo({ y: 0, animated: true });

      showAlert(
        "success",
        "¡Semana completada!",
        semanaActual === 4
          ? "🎉 Ciclo completo. Comenzamos nuevamente desde la semana 1."
          : `Nueva rutina generada para la semana ${data.semanaActual}.`
      );
    } catch (err) {
      console.error(err);
      showAlert(
        "error",
        "Error",
        "No se pudo generar la nueva rutina. Intenta de nuevo."
      );
    } finally {
      setCompletandoSemana(false);
    }
  };

  const detectLineType = (linea) => {
    if (!linea || linea.trim() === "") return "empty";
    if (linea.match(/^📋|^🍎|^💪|^⚙️|^📚|^📈|^📝|^⏰|^💡|^⚠️|^🔄|^🩺|^💊|^💧/))
      return "main-title";
    if (linea.match(/^DÍA \d+|^DESAYUNO|^MEDIA MAÑANA|^ALMUERZO|^MERIENDA|^CENA/i))
      return "day-title";
    if (linea.match(/^[A-ZÁÉÍÓÚ\s]+:$/) && linea.length < 30)
      return "muscle-group";
    if (linea.match(/^\d+\.\s/)) return "exercise";
    if (linea.match(/^⏱️|descanso/i)) return "rest-info";
    return "normal";
  };

  const renderLine = (linea, idx) => {
    const type = detectLineType(linea);
    const styleMap = {
      "empty": styles.emptyLine,
      "main-title": styles.mainTitle,
      "day-title": styles.dayTitle,
      "muscle-group": styles.muscleGroup,
      "exercise": styles.exercise,
      "rest-info": styles.restInfo,
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
          <Text style={styles.headerTitle}>Cargando rutina...</Text>
        </View>
        <ActivityIndicator size="large" color="#0A84FF" style={styles.loader} />
      </View>
    );
  }

  if (!rutina || rutina.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📋 Mi Rutina</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay rutina disponible todavía. Ve a "Mi entrenador personal" para generar tu plan.
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
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📋 Mi Rutina</Text>
      </View>

      <ScrollView 
        ref={rutinaRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.rutinaContainer}>
          {rutina.map((linea, idx) => renderLine(linea, idx))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleCompletarSemana}
          disabled={completandoSemana}
          style={[
            styles.completeButton,
            semanaActual === 4 && styles.completeButtonCycle,
            completandoSemana && styles.buttonDisabled
          ]}
        >
          <Text style={styles.completeButtonText}>
            {completandoSemana
              ? "Generando nueva rutina..."
              : semanaActual === 4
              ? "🎉 Completar Ciclo y Reiniciar"
              : `✅ Semana ${semanaActual} Completada`}
          </Text>
        </TouchableOpacity>
      </View>

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
  },
  backButtonText: {
    color: "#0A84FF",
    fontSize: 16,
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
    paddingBottom: 100,
  },
  rutinaContainer: {
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
  dayTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A84FF",
    marginTop: 12,
    marginBottom: 8,
  },
  muscleGroup: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
    marginBottom: 4,
  },
  exercise: {
    fontSize: 14,
    color: "#E5E5EA",
    marginLeft: 8,
    marginBottom: 4,
  },
  restInfo: {
    fontSize: 14,
    color: "#8E8E93",
    fontStyle: "italic",
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
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "#3A3A3C",
  },
  completeButton: {
    backgroundColor: "#0A84FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  completeButtonCycle: {
    backgroundColor: "#34C759",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RutinaViewer;

