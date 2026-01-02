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

        // rutina ya viene como array desde MongoDB
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

  if (loading) {
    return <div className="chatbot-container"><h2>Cargando rutina...</h2></div>;
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
        <p className="main-text">No hay rutina disponible todavía.</p>
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
          {rutina.map((linea, idx) => (
            <div key={idx}>
              <div className="message-content">{linea}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RutinaViewer;