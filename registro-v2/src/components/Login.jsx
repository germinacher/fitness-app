import React, { useState } from "react";
import "../styles/Register.css"; // Reutilizamos los mismos estilos

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error(data);
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar token en localStorage (si usas JWT)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Inicio de sesión exitoso");
      // Redirigir al menú principal
      window.location.href = "/main-menu";
      
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar al servidor");
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
          <p style={{ color: "#2e7d32", fontSize: "0.9rem" }}>
            ¿No tienes cuenta?{" "}
            <a 
              href="/register" 
              style={{ 
                color: "#2e7d32", 
                textDecoration: "underline",
                fontWeight: "600"
              }}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
