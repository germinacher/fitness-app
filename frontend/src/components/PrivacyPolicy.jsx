import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import "../styles/Register.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Política de Privacidad - Fitness App";
  }, []);

  return (
    <div className="register-container" style={{ maxWidth: "800px" }}>
      <div className="back-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <ArrowLeft size={20} strokeWidth={2} />
          <span>Volver</span>
        </button>
      </div>

      <h2>Política de Privacidad</h2>
      <p style={{ color: "#E5E5EA", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Última actualización:{" "}
        {new Date().toLocaleDateString("es-AR")}
      </p>

      <div
        style={{
          textAlign: "left",
          color: "#E5E5EA",
          lineHeight: "1.7",
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#2C2C2E",
          borderRadius: "12px",
        }}
      >
        <h3>1. Introducción</h3>
        <p>
          En Fitness App valoramos y respetamos tu privacidad. Esta Política de
          Privacidad explica cómo recopilamos, utilizamos, almacenamos y
          protegemos tus datos personales al utilizar la Aplicación.
        </p>

        <h3>2. Datos Personales que Recolectamos</h3>
        <p>Podemos recopilar los siguientes datos:</p>
        <ul>
          <li>Datos identificatorios: nombre, apellido, email</li>
          <li>Datos físicos: edad, peso, altura, género</li>
          <li>Preferencias alimentarias y alergias</li>
          <li>Objetivos de entrenamiento y preferencias</li>
          <li>Restricciones médicas declaradas voluntariamente</li>
          <li>Interacciones con el chatbot y uso de la Aplicación</li>
        </ul>

        <h3>3. Datos Sensibles</h3>
        <p>
          Algunos datos proporcionados por el usuario pueden considerarse datos
          sensibles (información de salud). Estos datos son brindados de manera
          <strong> voluntaria</strong> y se utilizan únicamente para personalizar
          la experiencia dentro de la Aplicación.
        </p>

        <h3>4. Uso de la Información</h3>
        <p>Utilizamos tus datos personales para:</p>
        <ul>
          <li>Generar rutinas y planes alimentarios personalizados</li>
          <li>Mejorar la funcionalidad y experiencia de la Aplicación</li>
          <li>Brindar soporte y comunicaciones relacionadas al servicio</li>
          <li>Analizar el uso de la Aplicación de forma interna</li>
        </ul>

        <h3>5. Compartición de Datos</h3>
        <ul>
          <li>❌ No vendemos tus datos personales</li>
          <li>❌ No compartimos tu información con terceros con fines comerciales</li>
          <li>
            ✅ Podremos compartir datos únicamente cuando sea requerido por ley
            o autoridad competente
          </li>
        </ul>

        <h3>6. Almacenamiento y Seguridad</h3>
        <p>
          Implementamos medidas técnicas y organizativas razonables para proteger
          tus datos personales contra accesos no autorizados, pérdida o uso
          indebido. Sin embargo, ningún sistema es 100% seguro.
        </p>

        <h3>7. Conservación de los Datos</h3>
        <p>
          Conservamos tus datos personales únicamente durante el tiempo necesario
          para cumplir con las finalidades para las cuales fueron recolectados,
          o hasta que solicites su eliminación.
        </p>

        <h3>8. Derechos del Usuario</h3>
        <p>
          De acuerdo con la Ley 25.326, tienes derecho a:
        </p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Solicitar la rectificación de datos incorrectos</li>
          <li>Solicitar la actualización o eliminación de tus datos</li>
          <li>Revocar tu consentimiento en cualquier momento</li>
        </ul>

        <p>
          Puedes ejercer estos derechos desde la Aplicación o mediante los
          canales de contacto indicados.
        </p>

        <h3>9. Cookies y Tecnologías Similares</h3>
        <p>
          Fitness App puede utilizar cookies o tecnologías similares únicamente
          con fines funcionales y analíticos, para mejorar la experiencia del
          usuario. No utilizamos cookies con fines publicitarios.
        </p>

        <h3>10. Uso por Menores de Edad</h3>
        <p>
          Fitness App está destinada exclusivamente a personas mayores de 18
          años. No recopilamos intencionalmente datos de menores de edad.
        </p>

        <h3>11. Cambios en la Política de Privacidad</h3>
        <p>
          Nos reservamos el derecho de modificar esta Política de Privacidad en
          cualquier momento. Los cambios serán notificados a través de la
          Aplicación.
        </p>

        <h3>12. Contacto</h3>
        <p>
          Para consultas, solicitudes o reclamos relacionados con la privacidad
          de tus datos:
        </p>
        <ul>
          <li>Email: soporte@fitnessapp.com</li>
          <li>Desde la Aplicación: Sección "Ayuda" o "Contacto"</li>
        </ul>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#3A3A3C",
            borderRadius: "8px",
          }}
        >
          <strong>ℹ️ Información Legal:</strong> La Agencia de Acceso a la
          Información Pública, órgano de control de la Ley 25.326, tiene la
          atribución de atender las denuncias y reclamos que se interpongan en
          relación al incumplimiento de las normas sobre protección de datos
          personales.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
