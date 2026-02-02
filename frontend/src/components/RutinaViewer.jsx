import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, RefreshCw, FileText } from 'lucide-react';
import { API_BASE } from "../config";
import "../styles/Chatbot.css";
import useAlert from "../hooks/useAlert";
import CustomAlert from "./CustomAlert";

const RutinaViewer = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const rutinaRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [rutina, setRutina] = useState([]);
  const [semanaActual, setSemanaActual] = useState(1);
  const [completandoSemana, setCompletandoSemana] = useState(false);

  const { alertConfig, showAlert, closeAlert } = useAlert();

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
      } catch (err) {
        console.error(err);
        showAlert("error", "Error", "No se pudo cargar la rutina.");
      } finally {
        setLoading(false);
      }
    };

    fetchRutina();
  }, [userId, navigate, showAlert]);

  /* =======================
     Completar semana
  ======================= */

  const handleCompletarSemana = () => {
    if (!userId) return;

    showAlert(
      "confirm",
      "¿Semana completada?",
      semanaActual === 4
        ? "¿Completaste la semana 4? Se iniciará un nuevo ciclo desde la semana 1."
        : `¿Completaste la semana ${semanaActual}? Se generará la rutina de la semana ${
            semanaActual + 1
          }.`,
      {
        confirmText: "Confirmar",
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

      rutinaRef.current?.scrollTo({ top: 0, behavior: "smooth" });

      showAlert(
        "success",
        "¡Semana completada!",
        semanaActual === 4
          ? "Ciclo completo. Comenzamos nuevamente desde la semana 1."
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

  /* =======================
     Renderizado de líneas
  ======================= */

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
    return (
      <div key={idx} className={`rutina-${type}`}>
        {linea}
      </div>
    );
  };

  /* =======================
     Estados de carga
  ======================= */

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
        <CustomAlert {...alertConfig} />
        <div className="chatbot-header">
          <button onClick={() => navigate("/main-menu")} className="back-button">
            <ArrowLeft size={20} strokeWidth={2} />
            <span>Volver</span>
          </button>
          <h2>
            <FileText size={24} strokeWidth={2} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
            Mi Rutina
          </h2>
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

  /* =======================
     Render principal
  ======================= */

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button onClick={() => navigate("/main-menu")} className="back-button">
          <ArrowLeft size={20} strokeWidth={2} />
          <span>Volver</span>
        </button>
        <h2>
          <FileText size={24} strokeWidth={2} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
          Mi Rutina
        </h2>
      </div>

      <div className="chatbot-content">
        <div className="plan-results with-footer-button" ref={rutinaRef}>
          <div className="plan-section">
            {rutina.map((linea, idx) => renderLine(linea, idx))}
          </div>
        </div>
      </div>

      <div className="rutina-footer-button">
        <button
          onClick={handleCompletarSemana}
          disabled={completandoSemana}
          className="restart-button"
          style={{
            backgroundColor: semanaActual === 4 ? "#34C759" : "#0A84FF",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {completandoSemana ? (
            <>
              <RefreshCw size={20} strokeWidth={2} className="spin-icon" />
              <span>Generando nueva rutina...</span>
            </>
          ) : semanaActual === 4 ? (
            <>
              <RefreshCw size={20} strokeWidth={2} />
              <span>Completar Ciclo y Reiniciar</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} strokeWidth={2} />
              <span>Semana {semanaActual} Completada</span>
            </>
          )}
        </button>
      </div>

      <CustomAlert {...alertConfig} />
    </div>
  );
};

export default RutinaViewer;