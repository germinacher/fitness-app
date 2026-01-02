import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    altura: "",
    peso: "",
    edad: "",
    genero: "",
    objetivo: "",
    preferencias: "",
    alergias: [],
    restricciones: [],
    intolerancias: [],
  });

  useEffect(() => {
    document.title = "Registro - Fitness App";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const currentValues = prev[category];
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir payload de la forma que espera backend
    const payload = {
      email: formData.email,
      password: formData.password,
      nombre: formData.nombre,
      apellido: formData.apellido,
      altura: formData.altura ? Number(formData.altura) : null,
      peso: formData.peso ? Number(formData.peso) : null,
      edad: formData.edad ? Number(formData.edad) : null,
      genero: formData.genero,
      objetivo: formData.objetivo,
      preferencias: formData.preferencias,
      alergias: formData.alergias,
      restricciones: formData.restricciones,
      intolerancias: formData.intolerancias,
    };

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        // mostrar errores de validación o mensaje backend
        console.error(data);
        alert(data.error || (data.errors && data.errors.map(e=>e.msg).join(", ")) || "Error al registrar");
        return;
      }

      alert("Registro exitoso — id: " + data.userId);
      // Redirigir a login después del registro exitoso
      navigate("/login");
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar al servidor");
    }
  };

  const opciones = {
    alergias: ["Mariscos", "Frutos secos", "Lácteos", "Huevos", "Otra"],
    restricciones: ["Diabetes", "Hipertensión", "Colesterol alto", "Otra"],
    intolerancias: ["Lactosa", "Gluten", "Fructosa", "Otra"],
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
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Columna izquierda - Datos personales y físicos */}
        <div className="form-column">
          {/* Datos personales */}
          <div className="form-section">
            <h3>Datos Personales</h3>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              />
            </div>
          </div>

          {/* Datos físicos */}
          <div className="form-section">
            <h3>Datos Físicos</h3>
            <div className="form-group">
              <label>Altura (cm)</label>
              <input
                type="number"
                min="100"
                max="300"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Peso (kg)</label>
              <input
                type="number"
                min="35"
                max="300"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                min="18"
                max="120"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Columna derecha - Objetivos y preferencias */}
        <div className="form-column">
          {/* Objetivo y preferencias */}
          <div className="form-section">
            <h3>Objetivos y Preferencias</h3>
            <div className="form-group">
              <label>Objetivo principal</label>
              <select
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Aumentar masa muscular">
                  Aumentar masa muscular
                </option>
                <option value="Perder grasa">Perder grasa</option>
                <option value="Mantener peso">Mantener peso</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferencias Alimentarias</label>
              <select
                name="preferencias"
                value={formData.preferencias}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Vegano">Vegano</option>
                <option value="Vegetariano">Vegetariano</option>
                <option value="Ninguna">Ninguna</option>
              </select>
            </div>
          </div>

          {/* Alergias */}
          <div className="form-section">
            <h3>Alergias</h3>
            <div className="form-group checkbox-group">
              <div className="checkbox-list">
                {opciones.alergias.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={formData.alergias.includes(item)}
                      onChange={() => handleCheckboxChange("alergias", item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Restricciones */}
          <div className="form-section">
            <h3>Restricciones Médicas</h3>
            <div className="form-group checkbox-group">
              <div className="checkbox-list">
                {opciones.restricciones.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={formData.restricciones.includes(item)}
                      onChange={() => handleCheckboxChange("restricciones", item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Intolerancias */}
          <div className="form-section">
            <h3>Intolerancias</h3>
            <div className="form-group checkbox-group">
              <div className="checkbox-list">
                {opciones.intolerancias.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={formData.intolerancias.includes(item)}
                      onChange={() => handleCheckboxChange("intolerancias", item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botón de registro - Full width */}
        <div className="form-full-width">
          <button type="submit" className="register-button">
            Registrarse
          </button>

          {/* Enlace para ir a login */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p style={{ color: "#009BD8", fontSize: "0.9rem" }}>
              ¿Ya tienes cuenta?{" "}
              <button 
                type="button"
                onClick={() => navigate("/login")}
                style={{ 
                  color: "#009BD8", 
                  textDecoration: "underline",
                  fontWeight: "600",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "inherit"
                }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
