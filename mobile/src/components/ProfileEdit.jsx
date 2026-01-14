import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../config";
import { storage } from "../utils/storage";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const ProfileEdit = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [activeTab, setActiveTab] = useState("datos");
  const { alertConfig, showAlert } = useAlert();

  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    edad: "",
    objetivo: "",
    preferencias: "",
    alergias: [],
    restricciones: [],
    intolerancias: [],
  });

  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "" });

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

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo obtener el perfil");

        setFormData({
          altura: data?.infoPersonal?.altura ?? "",
          peso: data?.infoPersonal?.peso ?? "",
          edad: data?.infoPersonal?.edad ?? "",
          objetivo: data?.objetivo ?? "",
          preferencias: data?.preferencias ?? "",
          alergias: Array.isArray(data?.alergias) ? data.alergias.filter(v => v !== "Ninguna") : [],
          restricciones: Array.isArray(data?.restricciones) ? data.restricciones.filter(v => v !== "Ninguna") : [],
          intolerancias: Array.isArray(data?.intolerancias) ? data.intolerancias.filter(v => v !== "Ninguna") : [],
        });
      } catch (e) {
        console.error(e);
        showAlert("error", "Error", "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, showAlert]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const list = prev[category];
      const next = list.includes(value) ? list.filter(v => v !== value) : [...list, value];
      return { ...prev, [category]: next };
    });
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const payload = {
        altura: formData.altura === "" ? undefined : Number(formData.altura),
        peso: formData.peso === "" ? undefined : Number(formData.peso),
        edad: formData.edad === "" ? undefined : Number(formData.edad),
        objetivo: formData.objetivo || undefined,
        preferencias: formData.preferencias || undefined,
        alergias: formData.alergias,
        restricciones: formData.restricciones,
        intolerancias: formData.intolerancias,
      };

      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (data.errors && data.errors.map(e => e.msg).join(", ")) || "Error al actualizar perfil");
      showAlert("success", "Perfil actualizado", "Modificaciones guardadas correctamente");
    } catch (e) {
      console.error(e);
      showAlert("error","Error", "No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  const handlePwdChange = async () => {
    if (!userId) return;
    
    if (pwdForm.currentPassword === pwdForm.newPassword) {
      showAlert("info", "Contraseña repetida", "La nueva contraseña debe ser diferente a la contraseña actual");
      return;
    }
    
    setChangingPwd(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pwdForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (data.errors && data.errors.map(e => e.msg).join(", ")) || "Error al cambiar contraseña");
      showAlert("success", "Contraseña actualizada", "La contraseña se actualizado correctamente");
      setPwdForm({ currentPassword: "", newPassword: "" });
    } catch (e) {
      console.error(e);
      showAlert("error", "Error", "No se pudo cambiar la contraseña");
    } finally {
      setChangingPwd(false);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
          {["datos", "objetivos", "salud", "password"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === "datos" ? "Datos" : tab === "objetivos" ? "Objetivos" : tab === "salud" ? "Salud" : "Contraseña"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === "datos" && (
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Datos Físicos</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Altura (cm)</Text>
              <TextInput 
                style={styles.input}
                value={String(formData.altura)}
                onChangeText={(value) => handleChange("altura", value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput 
                style={styles.input}
                value={String(formData.peso)}
                onChangeText={(value) => handleChange("peso", value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Edad</Text>
              <TextInput 
                style={styles.input}
                value={String(formData.edad)}
                onChangeText={(value) => handleChange("edad", value)}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity 
              style={[styles.button, saving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "objetivos" && (
          <View style={styles.form}>
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
            <TouchableOpacity 
              style={[styles.button, saving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "salud" && (
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Información de Salud</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.subsectionTitle}>Alergias</Text>
              {renderCheckboxGroup("alergias", opciones.alergias)}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.subsectionTitle}>Restricciones Médicas</Text>
              {renderCheckboxGroup("restricciones", opciones.restricciones)}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.subsectionTitle}>Intolerancias</Text>
              {renderCheckboxGroup("intolerancias", opciones.intolerancias)}
            </View>

            <TouchableOpacity 
              style={[styles.button, saving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "password" && (
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña actual</Text>
              <TextInput 
                style={styles.input}
                value={pwdForm.currentPassword}
                onChangeText={(value) => setPwdForm({ ...pwdForm, currentPassword: value })}
                secureTextEntry
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nueva contraseña</Text>
              <TextInput 
                style={styles.input}
                value={pwdForm.newPassword}
                onChangeText={(value) => setPwdForm({ ...pwdForm, newPassword: value })}
                secureTextEntry
              />
            </View>
            <TouchableOpacity 
              style={[styles.button, changingPwd && styles.buttonDisabled]}
              onPress={handlePwdChange}
              disabled={changingPwd}
            >
              <Text style={styles.buttonText}>
                {changingPwd ? "Actualizando..." : "Actualizar contraseña"}
              </Text>
            </TouchableOpacity>
          </View>
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
  loadingText: {
    color: "#FFFFFF",
    marginTop: 16,
    fontSize: 16,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
  },
  tabs: {
    maxHeight: 50,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#0A84FF",
  },
  tabText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#0A84FF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  form: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 20,
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
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#3A3A3C",
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
  button: {
    backgroundColor: "#0A84FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileEdit;

