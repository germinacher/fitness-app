import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Chatbot.css";

const DietaViewer = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [loading, setLoading] = useState(true);
  const [dieta, setDieta] = useState([]);

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

        // dieta ya viene como array desde MongoDB
        setDieta(Array.isArray(data?.dieta) ? data.dieta : []);
      } catch (e) {
        console.error(e);
        alert("No se pudo cargar la dieta");
      } finally {
        setLoading(false);
      }
    };

    fetchDieta();
  }, [userId, navigate]);

  if (loading) {
    return <div className="chatbot-container"><h2>Cargando dieta...</h2></div>;
  }

  if (!dieta || dieta.length === 0) {
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
          <h2>📋 Mi Dieta</h2>
        </div>
        <p className="main-text">No hay dieta disponible todavía.</p>
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
        <h2>📋 Mi Dieta</h2>
      </div>
      <div className="plan-results">
        <div className="plan-section">
          {dieta.map((linea, idx) => (
            <div key={idx}>
              <div className="message-content">{linea}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietaViewer;