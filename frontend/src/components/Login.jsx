import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Register.css";
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

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

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

        {/* Link de olvidé mi contraseña */}
        <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            style={{
              background: "none",
              border: "none",
              color: "#0A84FF",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: 0,
              fontFamily: "inherit"
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button 
          type="submit" 
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p style={{ color: "#E5E5EA", fontSize: "0.9rem", margin: 0 }}>
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                background: "none",
                border: "none",
                color: "#0A84FF",
                textDecoration: "underline",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit"
              }}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>

      <CustomAlert {...alertConfig} />
    </div>
  );
};

export default Login;
