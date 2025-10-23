import React, { useState } from "react";
import "../styles/Register.css";

const Register = () => {
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
      altura: formData.altura ? Number(formData.altura) : null,
      peso: formData.peso ? Number(formData.peso) : null,
      edad: formData.edad ? Number(formData.edad) : null,
      genero: formData.genero,
      objetivo: formData.objetivo,
      preferencias: formData.preferencias,
      alergias: formData.alergias.length > 0 ? formData.alergias : ["Ninguna"],
      restricciones: formData.restricciones.length > 0 ? formData.restricciones : ["Ninguna"],
      intolerancias: formData.intolerancias.length > 0 ? formData.intolerancias : ["Ninguna"],
    };

    try {
      const res = await fetch("http://localhost:4000/api/register", {
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
      // opcional: redirigir a login o dashboard
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
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Datos personales */}
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

        {/* Datos físicos */}
        <div className="form-group">
          <label>Altura (cm)</label>
          <input
            type="number"
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
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        {/* Género */}
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

        {/* Objetivo principal */}
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

        {/* Preferencias */}
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
            <option value="Pescetariano">Pescetariano</option>
            <option value="Ninguna">Ninguna</option>
          </select>
        </div>

        {/* Alergias */}
        <div className="form-group checkbox-group">
          <label>Alergias</label>
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

        {/* Restricciones */}
        <div className="form-group checkbox-group">
          <label>Restricciones Médicas</label>
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

        {/* Intolerancias */}
        <div className="form-group checkbox-group">
          <label>Intolerancias</label>
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

        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
