import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../config";
import CustomAlert from "./CustomAlert";
import useAlert from "../hooks/useAlert";
import "../styles/Register.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Token desde la URL
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, alertConfig, closeAlert } = useAlert();

  useEffect(() => {
    document.title = "Restablecer Contraseña - Fitness App";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert("error", "Error", "Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      showAlert("error", "Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert("error", "Error", data.error || "No se pudo restablecer la contraseña");
        return;
      }

      showAlert(
        "success",
        "¡Contraseña Actualizada!",
        "Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.",
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
      <h2>Restablecer Contraseña</h2>
      <p style={{ color: "#E5E5EA", marginBottom: "2rem", fontSize: "0.95rem" }}>
        Ingresa tu nueva contraseña.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite la contraseña"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? "Actualizando..." : "Restablecer contraseña"}
        </button>
      </form>

      <CustomAlert {...alertConfig} />
    </div>
  );
};

export default ResetPassword;