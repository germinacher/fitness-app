import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Chatbot.css";

const RutinaViewer = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [loading, setLoading] = useState(true);
  const [rutina, setRutina] = useState([]);
  const [semanaActual, setSemanaActual] = useState(1);
  const [completandoSemana, setCompletandoSemana] = useState(false);
  const rutinaRef = useRef(null);

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
        setSemanaActual(data?.semanaActual || 1);
      } catch (e) {
        console.error(e);
        alert("No se pudo cargar la rutina");
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [userId, navigate]);

  // Función para completar semana y generar nueva rutina
  const handleCompletarSemana = async () => {
    if (!userId) return;
    
    const confirmar = window.confirm(
      `¿Completaste la semana ${semanaActual}?\n\n` +
      `${semanaActual === 4 
        ? '🎉 ¡Felicidades! Completaste el ciclo de 4 semanas. Se generará un nuevo ciclo comenzando desde la semana 1.' 
        : `Se generará la rutina para la semana ${semanaActual + 1}.`}`
    );
    
    if (!confirmar) return;
    
    setCompletandoSemana(true);
    
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/completar-semana`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Error al generar nueva rutina");
      }
      
      // Actualizar estado local
      setRutina(Array.isArray(data.rutina) ? data.rutina : []);
      setSemanaActual(data.semanaActual);

      // Mover al inicio de la página
      if (rutinaRef.current) {
        rutinaRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      
      alert(
        semanaActual === 4 
          ? '🎉 ¡Ciclo completado! Comenzando nuevo ciclo - Semana 1' 
          : `✅ Semana ${semanaActual} completada. Nueva rutina generada para la semana ${data.semanaActual}.`
      );
      
    } catch (err) {
      console.error(err);
      alert("No se pudo generar la nueva rutina. Intenta de nuevo.");
    } finally {
      setCompletandoSemana(false);
    }
  };

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
      <div className="plan-results" ref={rutinaRef} style={{ paddingBottom: '80px' }}>
        <div className="plan-section">
          {rutina.map((linea, idx) => renderLine(linea, idx))}
        </div>
      </div>
      
      {/* Botón fijo en la parte inferior */}
      <div className="rutina-footer-button">
        <button 
          onClick={handleCompletarSemana}
          disabled={completandoSemana}
          className="restart-button"
          style={{ 
            margin: 0,
            width: '100%',
            backgroundColor: semanaActual === 4 ? '#34C759' : '#0A84FF'
          }}
        >
          {completandoSemana 
            ? 'Generando nueva rutina...' 
            : semanaActual === 4 
              ? '🎉 Completar Ciclo y Reiniciar' 
              : `✅ Semana ${semanaActual} Completada`
          }
        </button>
      </div>
    </div>
  );
};

export default RutinaViewer;