import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/MainMenu.css"; // Usar estilos específicos de MainMenu

const MainMenu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuario");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.title = "Menú Principal - Fitness App";
    
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      
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
    // Limpiar token del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Redirigir al login
    navigate("/login");
  };

  return (
    <div className="main-menu-container">
      <h2>Menú Principal</h2>
      
      <div className="welcome-message">
        {loading ? "Cargando..." : `¡Hola ${userName}!`}
      </div>

      <div className="main-menu-form">
        {/* Botones del menú */}
        <button 
          className="menu-button"
          onClick={() => navigate("/chatbot")}
        >
          <span className="menu-icon">💪</span>
          Mi entrenador personal
        </button>
        
        <button 
          className="menu-button"
          onClick={() => navigate("/rutinaviewer")}
        >
          <span className="menu-icon">📋</span>
          Mis Rutinas
        </button>

        <button 
          className="menu-button"
          onClick={() => alert("Funcionalidad de dietas próximamente")}
        >
          <span className="menu-icon">🍎</span>
          Mis Dietas
        </button>

        <button 
          className="menu-button"
          onClick={() => navigate("/profile")}
        >
          <span className="menu-icon">👤</span>
          Mi Perfil
        </button>

        {/* Botón de logout */}
        <button 
          className="menu-button logout-button"
          onClick={handleLogout}
        >
          <span className="menu-icon">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
