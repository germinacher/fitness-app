import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuario");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Menú Principal - Fitness App";
    
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (res.ok && data.infoPersonal) {
          const { nombre, apellido } = data.infoPersonal;
          setUserName(`${nombre} ${apellido}`);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserName();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="main-menu-container">
      {/* Título y mensaje de bienvenida */}
      <div className="main-menu-header">
        <h1 className="main-menu-title">Menú Principal</h1>
        <p className="welcome-message">
          {loading ? "Cargando..." : `¡Hola ${userName}!`}
        </p>
      </div>
      
      <div className="main-menu-form">
        {/* Primer botón rectangular - Entrenador Personal */}
        <button 
          className="menu-button-large"
          onClick={() => navigate("/chatbot")}
        >
          <span>💪 Mi entrenador personal</span>
        </button>

        {/* Dos botones cuadrados - Rutina y Dieta */}
        <div className="menu-grid">
          <button 
            className="menu-button-square"
            onClick={() => navigate("/rutinaviewer")}
          >
            <span>📋 Mi Rutina</span>
          </button>
          <button 
            className="menu-button-square"
            onClick={() => navigate("/dietaviewer")}
          >
            <span>🍎 Mi Dieta</span>
          </button>
        </div>

        {/* Segundo botón rectangular - Mi Perfil */}
        <button 
          className="menu-button-large"
          onClick={() => navigate("/profile")}
        >
          <span>👤 Mi Perfil</span>
        </button>

        {/* Botón pequeño - Cerrar Sesión */}
        <button 
          className="menu-button-small"
          onClick={handleLogout}
        >
          <span>🚪 Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;