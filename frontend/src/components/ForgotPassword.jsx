import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";
import "../styles/Register.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, alertConfig, closeAlert } = useAlert();

  useEffect(() => {
    document.title = "Recuperar Contraseña - Fitness App";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert("error", "Error", data.error || "No se pudo enviar el correo");
        return;
      }

      showAlert(
        "success",
        "¡Correo Enviado!",
        "Revisa tu bandeja de entrada. Te hemos enviado un enlace para restablecer tu contraseña.",
        {
            onConfirm: () => {
                closeAlert();
                navigate("/login");
            }
        }
      );

    } catch (err) {
      console.error("Error de conexión:", err);
      showAlert("error", "Error", "No se pudo conectar al servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="back-row">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="back-button"
        >
          ← Volver
        </button>
      </div>

      <h2>Recuperar Contraseña</h2>
      <p style={{ color: "#E5E5EA", marginBottom: "2rem", fontSize: "0.95rem" }}>
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>
      </form>

      <CustomAlert {...alertConfig} />
    </div>
  );
};

export default ForgotPassword;