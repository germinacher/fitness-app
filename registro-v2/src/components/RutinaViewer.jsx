import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Chatbot.css";

const RutinaViewer = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [loading, setLoading] = useState(true);
  const [rutina, setRutina] = useState([]);

  useEffect(() => {
    document.title = "Mi Rutina - Fitness App";

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchRutina = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo obtener la rutina");

        setRutina(Array.isArray(data?.rutina) ? data.rutina : []);
      } catch (e) {
        console.error(e);
        alert("No se pudo cargar la rutina");
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [userId, navigate]);

  // Función para detectar el tipo de línea
  const detectLineType = (linea) => {
    if (!linea || linea.trim() === "") return "empty";
    
    // Títulos principales (con emojis grandes)
    if (linea.match(/^📋|^🍎|^💪|^⚙️|^📚|^📈|^📝|^⏰|^💡|^⚠️|^🔄|^🩺|^💊|^💧/)) {
      return "main-title";
    }
    
    // Días de entrenamiento
    if (linea.match(/^DÍA \d+|^DESAYUNO|^MEDIA MAÑANA|^ALMUERZO|^MERIENDA|^CENA/i)) {
      return "day-title";
    }
    
    // Grupos musculares (todo en mayúsculas)
    if (linea.match(/^[A-ZÁÉÍÓÚ\s]+:$/) && linea.length < 30) {
      return "muscle-group";
    }
    
    // Ejercicios (empiezan con número y punto)
    if (linea.match(/^\d+\.\s/)) {
      return "exercise";
    }
    
    // Información de descansos/tiempo
    if (linea.match(/^⏱️|descanso/i)) {
      return "rest-info";
    }
    
    // Línea normal
    return "normal";
  };

  // Renderizar línea según su tipo
  const renderLine = (linea, idx) => {
    const type = detectLineType(linea);
    
    switch (type) {
      case "empty":
        return <div key={idx} className="rutina-empty-line" />;
      
      case "main-title":
        return (
          <div key={idx} className={`rutina-main-title ${idx === 0 ? 'first' : ''}`}>
            {linea}
          </div>
        );
      
      case "day-title":
        return (
          <div key={idx} className="rutina-day-title">
            {linea}
          </div>
        );
      
      case "muscle-group":
        return (
          <div key={idx} className="rutina-muscle-group">
            {linea}
          </div>
        );
      
      case "exercise":
        return (
          <div key={idx} className="rutina-exercise">
            {linea}
          </div>
        );
      
      case "rest-info":
        return (
          <div key={idx} className="rutina-rest-info">
            {linea}
          </div>
        );
      
      default:
        return (
          <div key={idx} className="rutina-normal-line">
            {linea}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>Cargando rutina...</h2>
        </div>
      </div>
    );
  }

  if (!rutina || rutina.length === 0) {
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
          <h2>📋 Mi Rutina</h2>
        </div>
        <div className="chatbot-content">
          <div className="chat-messages">
            <div className="message bot">
              <div className="message-content">
                No hay rutina disponible todavía. Ve a "Mi entrenador personal" para generar tu plan.
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
        <h2>📋 Mi Rutina</h2>
      </div>
      <div className="plan-results">
        <div className="plan-section">
          {rutina.map((linea, idx) => renderLine(linea, idx))}
        </div>
      </div>
    </div>
  );
};

export default RutinaViewer;