import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../config";
import { storage } from "../utils/storage";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const Chatbot = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [numberInput, setNumberInput] = useState("");
  const messagesEndRef = useRef(null);
  const scrollViewRef = useRef(null);
  const pesoUsuario = userInfo?.infoPersonal?.peso;
  const { showAlert, alertConfig } = useAlert();

  const questions = useMemo(() => ([
    {
      id: "dias_entrenamiento",
      text: "¿Cuántos días a la semana puedes entrenar?",
      type: "number",
      options: ["3 días", "4 días", "5 días", "6 días"]
    },
    {
      id: "duracion_entrenamiento",
      text: "¿Cuánto tiempo puedes dedicar a cada entrenamiento?",
      type: "select",
      options: ["30 minutos", "45 minutos", "60 minutos", "90 minutos"]
    },
    {
      id: "experiencia",
      text: "¿Cuál es tu nivel de experiencia?",
      type: "select",
      options: ["Principiante", "Intermedio", "Avanzado"]
    },
    {
      id: "enfoque",
      text: "Si prefieres una rutina adaptada con mayor énfasis en piernas, glúteos y core, responde `Adaptada`. Si prefieres una rutina enfocada en desarrollo muscular balanceado, responde `Balanceada`.",
      type: "select",
      options: ["Adaptada", "Balanceada"],
    },    
    {
      id: "peso_objetivo",
      text: `Veo que tu peso actual es ${pesoUsuario} kg, ¿Cuál es tu peso objetivo?`,
      type: "number",
      min: 40,
      max: 200
    },    
    {
      id: "horario_preferido",
      text: "¿En qué horario prefieres entrenar?",
      type: "select",
      options: ["Mañana", "Mediodía", "Tarde", "Noche"]
    }
  ]), [pesoUsuario]);

  const startConversation = useCallback((info = userInfo) => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setGeneratedPlan(null);
    setMessages([{
      type: "bot",
      text: info?.infoPersonal?.nombre ? `¡Hola ${info.infoPersonal.nombre}! 👋 Soy tu entrenador personal virtual. Voy a ayudarte a crear una rutina y dieta personalizada basada en tu perfil.` : "¡Hola! 👋"
    }, {
      type: "bot",
      text: questions[0].text
    }]);
  }, [userInfo, questions]);

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

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserInfo(data);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
        showAlert("error", "Error", "No se pudo cargar tu información");
      }
    };

    fetchUserInfo();
  }, [userId, showAlert]);

  useEffect(() => {
    if (userInfo) {
      startConversation(userInfo);
    }
  }, [userInfo, startConversation]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    setMessages(prev => [...prev, {
      type: "user",
      text: answer
    }]);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setMessages(prev => [...prev, {
          type: "bot",
          text: questions[currentQuestion + 1].text
        }]);
      }, 500);
    } else {
      setTimeout(() => {
        generatePlan(newAnswers);
      }, 500);
    }
  };

  const generatePlan = async (allAnswers) => {
    setIsGenerating(true);
    setMessages(prev => [...prev, {
      type: "bot",
      text: "Perfecto! Estoy generando tu rutina y dieta personalizada... ⏳"
    }]);

    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo,
          answers: allAnswers
        })
      });

      const data = await res.json();
      if (res.ok) {
        setGeneratedPlan(data);
        setShowResults(true);
        setMessages(prev => [...prev, {
          type: "bot",
          text: "¡Listo! He creado tu plan personalizado. Revisa los detalles abajo 👇"
        }]);
      } else {
        throw new Error(data.error || "Error al generar el plan");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        type: "bot",
        text: "Lo siento, hubo un error al generar tu plan. Por favor intenta de nuevo."
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentQ = questions[currentQuestion];

  const renderQuestionOptions = () => {
    if (showResults || !currentQ || isGenerating) return null;

    if (currentQ.type === "number") {
      if (currentQ.options && currentQ.options.length > 0) {
        return (
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.optionButton}
                onPress={() => handleAnswer(currentQ.id, option)}
              >
                <Text style={styles.optionButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      } else {
        return (
          <View style={styles.numberInputContainer}>
            <TextInput
              style={styles.numberInput}
              placeholder={`Entre ${currentQ.min || 40} y ${currentQ.max || 200} kg`}
              placeholderTextColor="#8E8E93"
              value={numberInput}
              onChangeText={setNumberInput}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                const value = Number(numberInput);
                const min = currentQ.min || 40;
                const max = currentQ.max || 200;
                
                if (value >= min && value <= max) {
                  handleAnswer(currentQ.id, value);
                  setNumberInput("");
                } else {
                  setMessages(prev => [
                    ...prev,
                    {
                      type: "bot",
                      text: `Por favor ingresa un valor entre ${min} y ${max} kg 🙏`
                    }
                  ]);
                }
              }}
            >
              <Text style={styles.confirmButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (currentQ.type === "select") {
      return (
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.optionButton}
              onPress={() => handleAnswer(currentQ.id, option)}
            >
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💪 Mi Entrenador Personal</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.message, msg.type === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
        
        {isGenerating && (
          <View style={[styles.message, styles.botMessage]}>
            <ActivityIndicator size="small" color="#0A84FF" />
            <Text style={styles.messageText}>Generando tu plan personalizado...</Text>
          </View>
        )}

        {renderQuestionOptions()}

        {showResults && generatedPlan && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>📋 Tu Rutina Personalizada</Text>
            <View style={styles.planSection}>
              <Text style={styles.planText}>{generatedPlan.rutina}</Text>
            </View>

            <Text style={styles.resultsTitle}>🍎 Tu Dieta Personalizada</Text>
            <View style={styles.planSection}>
              <Text style={styles.planText}>{generatedPlan.dieta}</Text>
            </View>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => startConversation()}
            >
              <Text style={styles.restartButtonText}>Crear Nuevo Plan</Text>
            </TouchableOpacity>
          </View>
        )}

        {showResults && !generatedPlan && (
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => startConversation()}
          >
            <Text style={styles.restartButtonText}>Iniciar Nueva Conversación</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <CustomAlert {...alertConfig} />
    </KeyboardAvoidingView>
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 40,
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1C1C1E",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0A84FF",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    marginBottom: 12,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  numberInputContainer: {
    marginTop: 16,
  },
  numberInput: {
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: "#0A84FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsContainer: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    marginTop: 24,
  },
  planSection: {
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  planText: {
    color: "#E5E5EA",
    fontSize: 14,
    lineHeight: 20,
  },
  restartButton: {
    backgroundColor: "#0A84FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  restartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Chatbot;

