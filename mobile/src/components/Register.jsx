import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from 'lucide-react-native';
import { API_BASE } from "../config";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const Register = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    altura: "",
    peso: "",
    edad: "",
    genero: "",
    objetivo: "",
    preferencias: "",
    alergias: [],
    restricciones: [],
    intolerancias: [],
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const { alertConfig, showAlert, closeAlert } = useAlert();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const currentValues = prev[category];
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleSubmit = async () => {
    if (!termsAccepted || !privacyAccepted) {
      showAlert("error", "Error", "Debes aceptar los términos y condiciones y la política de privacidad para continuar");
      return;
    }

    if (formData.password !== confirmPassword) {
      showAlert("error", "Error", "Las contraseñas no coinciden");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      nombre: formData.nombre,
      apellido: formData.apellido,
      altura: formData.altura ? Number(formData.altura) : null,
      peso: formData.peso ? Number(formData.peso) : null,
      edad: formData.edad ? Number(formData.edad) : null,
      genero: formData.genero,
      objetivo: formData.objetivo,
      preferencias: formData.preferencias,
      alergias: formData.alergias,
      restricciones: formData.restricciones,
      intolerancias: formData.intolerancias,
    };

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        showAlert("error", "Error", data.error || (data.errors && data.errors.map(e=>e.msg).join(", ")) || "Error al registrar");
        return;
      }

      showAlert("success", "Registro exitoso", "Tu cuenta ha sido creada exitosamente", {
        onConfirm: () => {
          closeAlert();
          navigation.replace("Login");
        }
      });
    } catch (err) {
      console.error("Error de conexión:", err);
      showAlert("error", "Error", "No se pudo conectar al servidor");
    }
  };

  const opciones = {
    alergias: ["Mariscos", "Frutos secos", "Lácteos", "Huevos", "Otra"],
    restricciones: ["Diabetes", "Hipertensión", "Colesterol alto", "Otra"],
    intolerancias: ["Lactosa", "Gluten", "Fructosa", "Otra"],
  };

  const renderCheckboxGroup = (category, items) => (
    <View style={styles.checkboxGroup}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.checkbox,
            formData[category].includes(item) && styles.checkboxSelected
          ]}
          onPress={() => handleCheckboxChange(category, item)}
        >
          <Text style={[
            styles.checkboxText,
            formData[category].includes(item) && styles.checkboxTextSelected
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} strokeWidth={2} color="#0A84FF" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Registro de Usuario</Text>

        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos Personales</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#8E8E93"
                value={formData.nombre}
                onChangeText={(value) => handleChange("nombre", value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor="#8E8E93"
                value={formData.apellido}
                onChangeText={(value) => handleChange("apellido", value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8E8E93"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#8E8E93"
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#8E8E93"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos Físicos</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Altura (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Altura"
                placeholderTextColor="#8E8E93"
                value={formData.altura}
                onChangeText={(value) => handleChange("altura", value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Peso"
                placeholderTextColor="#8E8E93"
                value={formData.peso}
                onChangeText={(value) => handleChange("peso", value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Edad</Text>
              <TextInput
                style={styles.input}
                placeholder="Edad"
                placeholderTextColor="#8E8E93"
                value={formData.edad}
                onChangeText={(value) => handleChange("edad", value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Género</Text>
              <View style={styles.selectContainer}>
                {["Masculino", "Femenino", "Otro"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.selectOption,
                      formData.genero === option && styles.selectOptionSelected
                    ]}
                    onPress={() => handleChange("genero", option)}
                  >
                    <Text style={[
                      styles.selectOptionText,
                      formData.genero === option && styles.selectOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos y Preferencias</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Objetivo principal</Text>
              <View style={styles.selectContainer}>
                {["Aumentar masa muscular", "Perder grasa", "Mantener peso"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.selectOption,
                      formData.objetivo === option && styles.selectOptionSelected
                    ]}
                    onPress={() => handleChange("objetivo", option)}
                  >
                    <Text style={[
                      styles.selectOptionText,
                      formData.objetivo === option && styles.selectOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Preferencias Alimentarias</Text>
              <View style={styles.selectContainer}>
                {["Vegano", "Vegetariano", "Ninguna"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.selectOption,
                      formData.preferencias === option && styles.selectOptionSelected
                    ]}
                    onPress={() => handleChange("preferencias", option)}
                  >
                    <Text style={[
                      styles.selectOptionText,
                      formData.preferencias === option && styles.selectOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alergias</Text>
            {renderCheckboxGroup("alergias", opciones.alergias)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Restricciones Médicas</Text>
            {renderCheckboxGroup("restricciones", opciones.restricciones)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Intolerancias</Text>
            {renderCheckboxGroup("intolerancias", opciones.intolerancias)}
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View style={[styles.checkboxSquare, termsAccepted && styles.checkboxSquareSelected]}>
                {termsAccepted && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Acepto los{" "}
                <Text 
                  style={styles.linkText}
                  onPress={() => navigation.navigate("TermsAndConditions")}
                >
                  términos y condiciones
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setPrivacyAccepted(!privacyAccepted)}
            >
              <View style={[styles.checkboxSquare, privacyAccepted && styles.checkboxSquareSelected]}>
                {privacyAccepted && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Acepto la{" "}
                <Text 
                  style={styles.linkText}
                  onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                  política de privacidad
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, (!termsAccepted || !privacyAccepted) && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={!termsAccepted || !privacyAccepted}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              ¿Ya tienes cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registerLink}>Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomAlert {...alertConfig} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButtonText: {
    color: "#0A84FF",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#E5E5EA",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#3A3A3C",
    marginRight: 8,
    marginBottom: 8,
  },
  selectOptionSelected: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
  selectOptionText: {
    color: "#E5E5EA",
    fontSize: 14,
  },
  selectOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  checkboxGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkbox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#3A3A3C",
    marginRight: 8,
    marginBottom: 8,
  },
  checkboxSelected: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
  checkboxText: {
    color: "#E5E5EA",
    fontSize: 14,
  },
  checkboxTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxSquare: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#3A3A3C",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSquareSelected: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
  checkboxMark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    color: "#E5E5EA",
    fontSize: 14,
  },
  linkText: {
    color: "#0A84FF",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#0A84FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  registerText: {
    color: "#E5E5EA",
    fontSize: 14,
  },
  registerLink: {
    color: "#0A84FF",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default Register;

