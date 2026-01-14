import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Términos y Condiciones - Fitness App";
  }, []);

  return (
    <div className="register-container" style={{ maxWidth: "800px" }}>
      <div className="back-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          ← Volver
        </button>
      </div>

      <h2>Términos y Condiciones</h2>
      <p style={{ color: "#E5E5EA", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Última actualización: {new Date().toLocaleDateString('es-AR')}
      </p>

      <div style={{ 
        textAlign: "left", 
        color: "#E5E5EA", 
        lineHeight: "1.7",
        maxHeight: "70vh",
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#2C2C2E",
        borderRadius: "12px"
      }}>
        
        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>1. Introducción</h3>
        <p>
          Bienvenido a Fitness App ("la Aplicación"). Al registrarte y utilizar nuestros servicios, 
          aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, 
          no utilices la Aplicación.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>2. Descripción del Servicio</h3>
        <p>
          Fitness App es una plataforma digital que ofrece:
        </p>
        <ul>
          <li>Generación automatizada de rutinas de entrenamiento personalizadas</li>
          <li>Planes alimentarios orientativos basados en tus datos personales</li>
          <li>Asistente virtual mediante chatbot con inteligencia artificial</li>
          <li>Seguimiento básico de progreso físico</li>
        </ul>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>3. Naturaleza del Servicio - Exención de Responsabilidad Médica</h3>
        <p><strong>IMPORTANTE:</strong> La Aplicación:</p>
        <ul>
          <li>❌ <strong>NO brinda asesoramiento médico, nutricional ni profesional</strong></li>
          <li>❌ <strong>NO reemplaza</strong> la consulta con médicos, nutricionistas o entrenadores certificados</li>
          <li>❌ <strong>NO diagnostica</strong> condiciones de salud ni prescribe tratamientos</li>
        </ul>
        <p>
          Las rutinas y planes alimentarios generados son de <strong>carácter informativo y orientativo</strong>, 
          creados mediante algoritmos automatizados que pueden contener errores o ser inadecuados para tu situación particular.
        </p>
        <p>
            Los planes alimentarios no constituyen dietas terapéuticas ni están diseñados para tratar patologías, 
            trastornos alimentarios, alergias severas o condiciones clínicas específicas.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>4. Uso Bajo Responsabilidad del Usuario</h3>
        <p>
          Al utilizar Fitness App, declaras y aceptas que:
        </p>
        <ul>
          <li>Eres el <strong>único responsable</strong> de verificar si estás apto física y médicamente para entrenar</li>
          <li>Consultarás con un profesional de la salud <strong>antes</strong> de iniciar cualquier programa de ejercicio o cambio alimentario</li>
          <li>El uso de la Aplicación es <strong>bajo tu propio riesgo</strong></li>
          <li>No harás responsable a Fitness App por:
            <ul>
              <li>Lesiones físicas derivadas del entrenamiento</li>
              <li>Problemas de salud relacionados con cambios alimentarios</li>
              <li>Resultados no esperados o ausencia de resultados</li>
              <li>Daños indirectos, incidentales o consecuentes</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>NO garantizamos</strong> resultados físicos, estéticos, de salud ni de rendimiento deportivo.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>5. Datos Personales y Privacidad</h3>
        <p><strong>Datos que Recolectamos:</strong></p>
        <ul>
          <li>Información personal: nombre, apellido, email</li>
          <li>Datos físicos: edad, peso, altura, género</li>
          <li>Preferencias alimentarias y alergias</li>
          <li>Restricciones médicas declaradas voluntariamente</li>
          <li>Objetivos de entrenamiento y preferencias</li>
          <li>Interacciones con el chatbot</li>
        </ul>

        <p><strong>Uso de tus Datos:</strong></p>
        <ul>
          <li>Personalizar rutinas y planes alimentarios</li>
          <li>Mejorar la funcionalidad del servicio</li>
          <li>Comunicarnos contigo sobre la Aplicación</li>
        </ul>

        <p><strong>Protección de Datos:</strong></p>
        <ul>
          <li>❌ <strong>NO vendemos</strong> tus datos a terceros</li>
          <li>❌ <strong>NO compartimos</strong> información personal sin tu consentimiento</li>
          <li>✅ Almacenamos tus datos de forma segura</li>
        </ul>

        <p><strong>Tus Derechos:</strong></p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Modificar información incorrecta</li>
          <li>Solicitar eliminación de tu cuenta y datos</li>
        </ul>

        <p>
            Al proporcionar información médica o de salud, el usuario declara hacerlo de manera voluntaria y consciente, 
            autorizando su uso únicamente para la personalización del servicio.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>6. Limitaciones del Chatbot e Inteligencia Artificial</h3>
        <p>
          El chatbot utiliza algoritmos automatizados de inteligencia artificial. Por tanto:
        </p>
        <ul>
          <li>Las respuestas pueden ser <strong>inexactas, incompletas o inapropiadas</strong></li>
          <li>No tiene conocimiento médico real ni capacidad de diagnóstico</li>
          <li>Se basa en información general y patrones de datos</li>
          <li>Puede generar contenido que requiera verificación profesional</li>
        </ul>
        <p>
          <strong>No confíes exclusivamente</strong> en las recomendaciones del chatbot para decisiones importantes sobre tu salud.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>7. Restricciones de Uso</h3>
        <p>Está <strong>PROHIBIDO:</strong></p>
        <ul>
          <li>Utilizar la Aplicación si tienes condiciones médicas no declaradas o sin autorización profesional</li>
          <li>Proporcionar datos falsos o de terceros</li>
          <li>Usar la Aplicación con fines comerciales sin autorización expresa</li>
          <li>Intentar acceder a datos de otros usuarios</li>
          <li>Realizar ingeniería inversa del sistema</li>
          <li>Responsabilizar a Fitness App por daños derivados del uso indebido</li>
        </ul>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>8. Edad Mínima y Consentimiento</h3>
        <p>
          El uso de Fitness App está permitido <strong>únicamente a mayores de 18 años</strong>.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>9. Resultados y Expectativas</h3>
        <p>
          Los resultados físicos varían según múltiples factores individuales:
        </p>
        <ul>
          <li>Genética</li>
          <li>Adherencia al plan</li>
          <li>Estado de salud previo</li>
          <li>Estilo de vida general</li>
        </ul>
        <p>
          <strong>NO prometemos ni garantizamos:</strong>
        </p>
        <ul>
          <li>Pérdida o ganancia específica de peso</li>
          <li>Aumento de masa muscular determinado</li>
          <li>Mejoras en salud o rendimiento</li>
          <li>Resultados en plazos específicos</li>
        </ul>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>10. Modificaciones del Servicio</h3>
        <p>
          Fitness App se reserva el derecho de:
        </p>
        <ul>
          <li>Modificar, actualizar o discontinuar funcionalidades</li>
          <li>Cambiar estos Términos y Condiciones (notificándote previamente)</li>
          <li>Suspender o interrumpir el servicio temporal o permanentemente</li>
          <li>Modificar planes de suscripción o precios (si aplicara)</li>
        </ul>

        <p>
            Fitness App no garantiza que la Aplicación funcione de forma ininterrumpida, 
            libre de errores o sin fallas técnicas
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>11. Propiedad Intelectual</h3>
        <p>
          Todos los derechos de propiedad intelectual sobre la Aplicación, su diseño, código, 
          contenido y marca son propiedad de Fitness App. No puedes copiar, modificar o distribuir 
          sin autorización expresa.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>12. Jurisdicción y Ley Aplicable</h3>
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la <strong>República Argentina</strong>.
        </p>
        <p>
          Cualquier controversia será resuelta en los tribunales competentes de la 
          Ciudad Autónoma de Buenos Aires, Argentina.
        </p>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>13. Contacto</h3>
        <p>
          Para consultas, solicitudes sobre tus datos o reportar problemas:
        </p>
        <ul>
          <li>Email: soporte@fitnessapp.com</li>
          <li>Desde la Aplicación: Sección "Ayuda" o "Contacto"</li>
        </ul>

        <h3 style={{ color: "#ffffff", marginTop: "1.5rem" }}>14. Aceptación de los Términos</h3>
        <p>
          Al marcar la casilla "Acepto los Términos y Condiciones" y registrarte en Fitness App, 
          confirmas que:
        </p>
        <ul>
          <li>Has leído y comprendido estos términos en su totalidad</li>
          <li>Aceptas estar legalmente obligado por ellos</li>
          <li>Tienes la edad mínima requerida o cuentas con autorización</li>
          <li>Asumes la responsabilidad del uso de la Aplicación</li>
        </ul>

        <p>
            El usuario puede solicitar la eliminación de su cuenta en cualquier momento desde la Aplicación 
            o por los canales de contacto.
        </p>

        <p style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#3A3A3C", borderRadius: "8px" }}>
            <strong>⚠️ ADVERTENCIA FINAL:</strong> Si tienes dudas sobre tu estado de salud, 
            condiciones médicas preexistentes, lesiones o estás embarazada, <strong>NO utilices </strong>  
            esta Aplicación sin consultar previamente con un profesional médico.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;