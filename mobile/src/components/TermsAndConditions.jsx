import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Términos y Condiciones</Text>
        <Text style={styles.date}>
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>1. Introducción</Text>
        <Text style={styles.text}>
          Bienvenido a Fitness App ("la Aplicación"). Al registrarte y utilizar nuestros servicios, 
          aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, 
          no utilices la Aplicación.
        </Text>

        <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
        <Text style={styles.text}>
          Fitness App es una plataforma digital que ofrece:
        </Text>
        <Text style={styles.bullet}>• Generación automatizada de rutinas de entrenamiento personalizadas</Text>
        <Text style={styles.bullet}>• Planes alimentarios orientativos basados en tus datos personales</Text>
        <Text style={styles.bullet}>• Asistente virtual mediante chatbot con inteligencia artificial</Text>
        <Text style={styles.bullet}>• Seguimiento básico de progreso físico</Text>

        <Text style={styles.sectionTitle}>3. Naturaleza del Servicio - Exención de Responsabilidad Médica</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>IMPORTANTE:</Text> La Aplicación:
        </Text>
        <Text style={styles.bullet}>❌ <Text style={styles.bold}>NO brinda asesoramiento médico, nutricional ni profesional</Text></Text>
        <Text style={styles.bullet}>❌ <Text style={styles.bold}>NO reemplaza</Text> la consulta con médicos, nutricionistas o entrenadores certificados</Text>
        <Text style={styles.bullet}>❌ <Text style={styles.bold}>NO diagnostica</Text> condiciones de salud ni prescribe tratamientos</Text>
        <Text style={styles.text}>
          Las rutinas y planes alimentarios generados son de <Text style={styles.bold}>carácter informativo y orientativo</Text>, 
          creados mediante algoritmos automatizados que pueden contener errores o ser inadecuados para tu situación particular.
        </Text>

        <Text style={styles.sectionTitle}>4. Uso Bajo Responsabilidad del Usuario</Text>
        <Text style={styles.text}>
          Al utilizar Fitness App, declaras y aceptas que:
        </Text>
        <Text style={styles.bullet}>• Eres el <Text style={styles.bold}>único responsable</Text> de verificar si estás apto física y médicamente para entrenar</Text>
        <Text style={styles.bullet}>• Consultarás con un profesional de la salud <Text style={styles.bold}>antes</Text> de iniciar cualquier programa de ejercicio o cambio alimentario</Text>
        <Text style={styles.bullet}>• El uso de la Aplicación es <Text style={styles.bold}>bajo tu propio riesgo</Text></Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>NO garantizamos</Text> resultados físicos, estéticos, de salud ni de rendimiento deportivo.
        </Text>

        <Text style={styles.sectionTitle}>5. Datos Personales y Privacidad</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Datos que Recolectamos:</Text>
        </Text>
        <Text style={styles.bullet}>• Información personal: nombre, apellido, email</Text>
        <Text style={styles.bullet}>• Datos físicos: edad, peso, altura, género</Text>
        <Text style={styles.bullet}>• Preferencias alimentarias y alergias</Text>
        <Text style={styles.bullet}>• Restricciones médicas declaradas voluntariamente</Text>
        <Text style={styles.bullet}>• Objetivos de entrenamiento y preferencias</Text>
        <Text style={styles.bullet}>• Interacciones con el chatbot</Text>

        <Text style={styles.sectionTitle}>6. Limitaciones del Chatbot e Inteligencia Artificial</Text>
        <Text style={styles.text}>
          El chatbot utiliza algoritmos automatizados de inteligencia artificial. Por tanto:
        </Text>
        <Text style={styles.bullet}>• Las respuestas pueden ser <Text style={styles.bold}>inexactas, incompletas o inapropiadas</Text></Text>
        <Text style={styles.bullet}>• No tiene conocimiento médico real ni capacidad de diagnóstico</Text>
        <Text style={styles.bullet}>• Se basa en información general y patrones de datos</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>No confíes exclusivamente</Text> en las recomendaciones del chatbot para decisiones importantes sobre tu salud.
        </Text>

        <Text style={styles.sectionTitle}>7. Restricciones de Uso</Text>
        <Text style={styles.text}>
          Está <Text style={styles.bold}>PROHIBIDO:</Text>
        </Text>
        <Text style={styles.bullet}>• Utilizar la Aplicación si tienes condiciones médicas no declaradas o sin autorización profesional</Text>
        <Text style={styles.bullet}>• Proporcionar datos falsos o de terceros</Text>
        <Text style={styles.bullet}>• Usar la Aplicación con fines comerciales sin autorización expresa</Text>

        <Text style={styles.sectionTitle}>8. Edad Mínima y Consentimiento</Text>
        <Text style={styles.text}>
          El uso de Fitness App está permitido <Text style={styles.bold}>únicamente a mayores de 18 años</Text>.
        </Text>

        <Text style={styles.sectionTitle}>9. Resultados y Expectativas</Text>
        <Text style={styles.text}>
          Los resultados físicos varían según múltiples factores individuales:
        </Text>
        <Text style={styles.bullet}>• Genética</Text>
        <Text style={styles.bullet}>• Adherencia al plan</Text>
        <Text style={styles.bullet}>• Estado de salud previo</Text>
        <Text style={styles.bullet}>• Estilo de vida general</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>NO prometemos ni garantizamos:</Text>
        </Text>
        <Text style={styles.bullet}>• Pérdida o ganancia específica de peso</Text>
        <Text style={styles.bullet}>• Aumento de masa muscular determinado</Text>
        <Text style={styles.bullet}>• Mejoras en salud o rendimiento</Text>

        <Text style={styles.sectionTitle}>10. Modificaciones del Servicio</Text>
        <Text style={styles.text}>
          Fitness App se reserva el derecho de:
        </Text>
        <Text style={styles.bullet}>• Modificar, actualizar o discontinuar funcionalidades</Text>
        <Text style={styles.bullet}>• Cambiar estos Términos y Condiciones (notificándote previamente)</Text>
        <Text style={styles.bullet}>• Suspender o interrumpir el servicio temporal o permanentemente</Text>

        <Text style={styles.sectionTitle}>11. Propiedad Intelectual</Text>
        <Text style={styles.text}>
          Todos los derechos de propiedad intelectual sobre la Aplicación, su diseño, código, 
          contenido y marca son propiedad de Fitness App. No puedes copiar, modificar o distribuir 
          sin autorización expresa.
        </Text>

        <Text style={styles.sectionTitle}>12. Jurisdicción y Ley Aplicable</Text>
        <Text style={styles.text}>
          Estos Términos y Condiciones se rigen por las leyes de la <Text style={styles.bold}>República Argentina</Text>.
        </Text>
        <Text style={styles.text}>
          Cualquier controversia será resuelta en los tribunales competentes de la 
          Ciudad Autónoma de Buenos Aires, Argentina.
        </Text>

        <Text style={styles.sectionTitle}>13. Contacto</Text>
        <Text style={styles.text}>
          Para consultas, solicitudes sobre tus datos o reportar problemas:
        </Text>
        <Text style={styles.bullet}>• Email: soporte@fitnessapp.com</Text>
        <Text style={styles.bullet}>• Desde la Aplicación: Sección "Ayuda" o "Contacto"</Text>

        <Text style={styles.sectionTitle}>14. Aceptación de los Términos</Text>
        <Text style={styles.text}>
          Al marcar la casilla "Acepto los Términos y Condiciones" y registrarte en Fitness App, 
          confirmas que:
        </Text>
        <Text style={styles.bullet}>• Has leído y comprendido estos términos en su totalidad</Text>
        <Text style={styles.bullet}>• Aceptas estar legalmente obligado por ellos</Text>
        <Text style={styles.bullet}>• Tienes la edad mínima requerida o cuentas con autorización</Text>
        <Text style={styles.bullet}>• Asumes la responsabilidad del uso de la Aplicación</Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            <Text style={styles.bold}>⚠️ ADVERTENCIA FINAL:</Text> Si tienes dudas sobre tu estado de salud, 
            condiciones médicas preexistentes, lesiones o estás embarazada, <Text style={styles.bold}>NO utilices </Text>  
            esta Aplicación sin consultar previamente con un profesional médico.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#000000",
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: "#0A84FF",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  date: {
    color: "#E5E5EA",
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: "#E5E5EA",
    lineHeight: 22,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 14,
    color: "#E5E5EA",
    lineHeight: 22,
    marginBottom: 8,
    marginLeft: 8,
  },
  bold: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  warningBox: {
    backgroundColor: "#3A3A3C",
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  warningText: {
    fontSize: 14,
    color: "#E5E5EA",
    lineHeight: 22,
  },
});

export default TermsAndConditions;

