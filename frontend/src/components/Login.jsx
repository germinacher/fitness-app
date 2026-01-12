import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Register.css"; // Reutilizamos los mismos estilos

import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { showAlert, alertConfig } = useAlert();

  useEffect(() => {
    document.title = "Iniciar Sesión - Fitness App";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error(data);
        showAlert("error", "Error", data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar token y userId en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      //alert("Inicio de sesión exitoso");
      // Redirigir al menú principal usando React Router
      navigate("/main-menu");
      
    } catch (err) {
      console.error("Error de conexión:", err);
      showAlert("error", "Error", "No se pudo conectar al servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {/* Contraseña */}
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        {/* Enlace para ir a registro */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p style={{ color: "#009BD8", fontSize: "0.9rem" }}>
            ¿No tienes cuenta?{" "}
            <a 
              href="/register" 
              style={{ 
                color: "#009BD8", 
                textDecoration: "underline",
                fontWeight: "600"
              }}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>

      <CustomAlert {...alertConfig} />
    </div>
  );
};

export default Login;
