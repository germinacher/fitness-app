import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Chatbot.css";

import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const DietaViewer = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [loading, setLoading] = useState(true);
  const [dieta, setDieta] = useState([]);

  const { showAlert, alertConfig } = useAlert();

  useEffect(() => {
    document.title = "Mi Dieta - Fitness App";

    if (!userId) {
      navigate("/login");
      return;
    }

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
  }, [userId, navigate, showAlert]);

  // Función para detectar el tipo de línea
  const detectLineType = (linea) => {
    if (!linea || linea.trim() === "") return "empty";
    
    // Títulos principales (con emojis grandes)
    if (linea.match(/^🍎|^👤|^⚠️|^🎯|^⏰|^🍽️|^💡|^🩺|^💊|^💧|^📝|^📊/)) {
      return "main-title";
    }
    
    // Comidas del día (DESAYUNO, ALMUERZO, etc.)
    if (linea.match(/^DESAYUNO|^MEDIA MAÑANA|^ALMUERZO|^MERIENDA|^CENA/i)) {
      return "meal-title";
    }
    
    // Subtítulos con mayúsculas (INFORMACIÓN, TIMING, etc.)
    if (linea.match(/^[A-ZÁÉÍÓÚ\s]+:$/) && linea.length < 50) {
      return "section-subtitle";
    }
    
    // Items de comida (empiezan con • o con cantidades)
    if (linea.match(/^•|^\d+g|^\d+ml|^\d+ unidad|^\d+ cucharada/i)) {
      return "food-item";
    }
    
    // Macros aproximados (contiene "Macros aprox:")
    if (linea.match(/macros aprox/i)) {
      return "macros-info";
    }
    
    // Tips y consejos (empiezan con 💪, 🔥, ✅, ❌, etc.)
    if (linea.match(/^💪|^🔥|^✅|^❌|^⚠️|^📌/)) {
      return "tip-info";
    }
    
    // Línea normal
    return "normal";
  };

  // Renderizar línea según su tipo
  const renderLine = (linea, idx) => {
    const type = detectLineType(linea);
    
    switch (type) {
      case "empty":
        return <div key={idx} className="dieta-empty-line" />;
      
      case "main-title":
        return (
          <div key={idx} className={`dieta-main-title ${idx === 0 ? 'first' : ''}`}>
            {linea}
          </div>
        );
      
      case "meal-title":
        return (
          <div key={idx} className="dieta-meal-title">
            {linea}
          </div>
        );
      
      case "section-subtitle":
        return (
          <div key={idx} className="dieta-section-subtitle">
            {linea}
          </div>
        );
      
      case "food-item":
        return (
          <div key={idx} className="dieta-food-item">
            {linea}
          </div>
        );
      
      case "macros-info":
        return (
          <div key={idx} className="dieta-macros-info">
            {linea}
          </div>
        );
      
      case "tip-info":
        return (
          <div key={idx} className="dieta-tip-info">
            {linea}
          </div>
        );
      
      default:
        return (
          <div key={idx} className="dieta-normal-line">
            {linea}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Cargando dieta...</h2>
        </div>
      </div>
    );
  }

  if (!dieta || dieta.length === 0) {
    return (
      <div className="chatbot-container">
        <CustomAlert {...alertConfig} />
        <div className="chatbot-header">
          <button
            type="button"
            onClick={() => navigate("/main-menu")}
            className="back-button"
          >
            ← Volver
          </button>
          <h2>🍎 Mi Dieta</h2>
        </div>
        <div className="chatbot-content">
          <div className="chat-messages">
            <div className="message bot">
              <div className="message-content">
                No hay dieta disponible todavía. Ve a "Mi entrenador personal" para generar tu plan.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button
          type="button"
          onClick={() => navigate("/main-menu")}
          className="back-button"
        >
          ← Volver
        </button>
        <h2>🍎 Mi Dieta</h2>
      </div>
      <div className="plan-results">
        <div className="plan-section">
          {dieta.map((linea, idx) => renderLine(linea, idx))}
        </div>
      </div>
    </div>
  );
};

export default DietaViewer;