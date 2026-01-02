import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Register.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("userId"), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);

  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    edad: "",
    objetivo: "",
    preferencias: "",
    alergias: [],
    restricciones: [],
    intolerancias: [],
  });

  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    document.title = "Editar Perfil - Fitness App";
    
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo obtener el perfil");

        setFormData({
          altura: data?.infoPersonal?.altura ?? "",
          peso: data?.infoPersonal?.peso ?? "",
          edad: data?.infoPersonal?.edad ?? "",
          objetivo: data?.objetivo ?? "",
          preferencias: data?.preferencias ?? "",
          alergias: Array.isArray(data?.alergias) ? data.alergias.filter(v => v !== "Ninguna") : [],
          restricciones: Array.isArray(data?.restricciones) ? data.restricciones.filter(v => v !== "Ninguna") : [],
          intolerancias: Array.isArray(data?.intolerancias) ? data.intolerancias.filter(v => v !== "Ninguna") : [],
        });
      } catch (e) {
        console.error(e);
        alert("No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const list = prev[category];
      const next = list.includes(value) ? list.filter(v => v !== value) : [...list, value];
      return { ...prev, [category]: next };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    try {
      const payload = {
        altura: formData.altura === "" ? undefined : Number(formData.altura),
        peso: formData.peso === "" ? undefined : Number(formData.peso),
        edad: formData.edad === "" ? undefined : Number(formData.edad),
        objetivo: formData.objetivo || undefined,
        preferencias: formData.preferencias || undefined,
        alergias: formData.alergias,
        restricciones: formData.restricciones,
        intolerancias: formData.intolerancias,
      };

      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (data.errors && data.errors.map(e => e.msg).join(", ")) || "Error al actualizar perfil");
      alert("Perfil actualizado");
    } catch (e) {
      console.error(e);
      alert(e.message || "No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  const handlePwdChange = async (e) => {
    e.preventDefault();
    if (!userId) return;
    
    // Validar que la nueva contraseña sea diferente a la actual
    if (pwdForm.currentPassword === pwdForm.newPassword) {
      alert("La nueva contraseña debe ser diferente a la contraseña actual");
      return;
    }
    
    setChangingPwd(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pwdForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (data.errors && data.errors.map(e => e.msg).join(", ")) || "Error al cambiar contraseña");
      alert("Contraseña actualizada");
      setPwdForm({ currentPassword: "", newPassword: "" });
    } catch (e) {
      console.error(e);
      alert(e.message || "No se pudo cambiar la contraseña");
    } finally {
      setChangingPwd(false);
    }
  };

  const opciones = {
    alergias: ["Mariscos", "Frutos secos", "Lácteos", "Huevos", "Otra"],
    restricciones: ["Diabetes", "Hipertensión", "Colesterol alto", "Otra"],
    intolerancias: ["Lactosa", "Gluten", "Fructosa", "Otra"],
  };

  if (loading) return <div className="register-container"><h2>Cargando perfil...</h2></div>;

  return (
    <div className="register-container">
        <div className="back-row">
            <button
            type="button"
            onClick={() => navigate("/main-menu")}
            className="back-button"
            >
            ← Volver
            </button>
        </div>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSave} className="register-form">
            <div className="form-column">
                <div className="form-section">
                    <h3>Datos Físicos</h3>
                    <div className="form-group">
                        <label>Altura (cm)</label>
                        <input type="number" min="100" max="300" name="altura" value={formData.altura} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Peso (kg)</label>
                        <input type="number" min="35" max="300" name="peso" value={formData.peso} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Edad</label>
                        <input type="number" min="18" max="120" name="edad" value={formData.edad} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-section">
                <h3>Objetivos y Preferencias</h3>
                <div className="form-group">
                    <label>Objetivo principal</label>
                    <select name="objetivo" value={formData.objetivo} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option value="Aumentar masa muscular">Aumentar masa muscular</option>
                    <option value="Perder grasa">Perder grasa</option>
                    <option value="Mantener peso">Mantener peso</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Preferencias Alimentarias</label>
                    <select name="preferencias" value={formData.preferencias} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Ninguna">Ninguna</option>
                    </select>
                </div>
                </div>
            </div>

            <div className="form-column">
                <div className="form-section">
                    <h3>Alergias</h3>
                    <div className="form-group checkbox-group">
                        <div className="checkbox-list">
                            {opciones.alergias.map((item) => (
                                <label key={item}>
                                <input type="checkbox" checked={formData.alergias.includes(item)} onChange={() => handleCheckboxChange("alergias", item)} />
                                {item}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Restricciones Médicas</h3>
                    <div className="form-group checkbox-group">
                        <div className="checkbox-list">
                            {opciones.restricciones.map((item) => (
                                <label key={item}>
                                <input type="checkbox" checked={formData.restricciones.includes(item)} onChange={() => handleCheckboxChange("restricciones", item)} />
                                {item}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Intolerancias</h3>
                    <div className="form-group checkbox-group">
                        <div className="checkbox-list">
                            {opciones.intolerancias.map((item) => (
                                <label key={item}>
                                <input type="checkbox" checked={formData.intolerancias.includes(item)} onChange={() => handleCheckboxChange("intolerancias", item)} />
                                {item}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-full-width">
                <button type="submit" className="register-button" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </form>

        <div className="form-full-width" style={{ marginTop: "1rem" }}>
            <div className="form-section">
                <h3>Cambiar contraseña</h3>
                <form onSubmit={handlePwdChange}>
                    <div className="form-group">
                        <label>Contraseña actual</label>
                        <input type="password" value={pwdForm.currentPassword} onChange={e => setPwdForm({ ...pwdForm, currentPassword: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Nueva contraseña</label>
                        <input type="password" value={pwdForm.newPassword} onChange={e => setPwdForm({ ...pwdForm, newPassword: e.target.value })} required />
                    </div>
                    <button type="submit" className="register-button" disabled={changingPwd}>
                        {changingPwd ? "Actualizando..." : "Actualizar contraseña"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ProfileEdit;


