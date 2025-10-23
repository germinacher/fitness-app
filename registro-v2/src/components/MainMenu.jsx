import React from "react";
import "../styles/MainMenu.css"; // Usar estilos específicos de MainMenu

const MainMenu = () => {
  const handleLogout = () => {
    // Limpiar token del localStorage
    localStorage.removeItem("token");
    // Redirigir al login
    window.location.href = "/login";
  };

  return (
    <div className="main-menu-container">
      <h2>Menú Principal</h2>
      
      <div className="welcome-message">
        ¡Bienvenido a tu aplicación fitness!
      </div>

      <div className="main-menu-form">
        {/* Botones del menú */}
        <button 
          className="menu-button"
          onClick={() => alert("Funcionalidad de chatbot próximamente")}
        >
          <span className="menu-icon">💪</span>
          Mi entrenador personal
        </button>
        
        <button 
          className="menu-button"
          onClick={() => alert("Funcionalidad de rutinas próximamente")}
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
          onClick={() => alert("Funcionalidad de progreso próximamente")}
        >
          <span className="menu-icon">📊</span>
          Mi Progreso
        </button>

        <button 
          className="menu-button"
          onClick={() => alert("Funcionalidad de perfil próximamente")}
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
