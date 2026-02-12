import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from 'lucide-react-native';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} strokeWidth={2} color="#0A84FF" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.date}>
          Última actualización: {new Date().toLocaleDateString("es-AR")}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>1. Introducción</Text>
        <Text style={styles.text}>
          En Fitness App valoramos y respetamos tu privacidad. Esta Política de
          Privacidad explica cómo recopilamos, utilizamos, almacenamos y
          protegemos tus datos personales al utilizar la Aplicación.
        </Text>

        <Text style={styles.sectionTitle}>2. Datos Personales que Recolectamos</Text>
        <Text style={styles.text}>Podemos recopilar los siguientes datos:</Text>
        <Text style={styles.bullet}>• Datos identificatorios: nombre, apellido, email</Text>
        <Text style={styles.bullet}>• Datos físicos: edad, peso, altura, género</Text>
        <Text style={styles.bullet}>• Preferencias alimentarias y alergias</Text>
        <Text style={styles.bullet}>• Objetivos de entrenamiento y preferencias</Text>
        <Text style={styles.bullet}>• Restricciones médicas declaradas voluntariamente</Text>
        <Text style={styles.bullet}>• Interacciones con el chatbot y uso de la Aplicación</Text>

        <Text style={styles.sectionTitle}>3. Datos Sensibles</Text>
        <Text style={styles.text}>
          Algunos datos proporcionados por el usuario pueden considerarse datos
          sensibles (información de salud). Estos datos son brindados de manera
          <Text style={styles.bold}> voluntaria</Text> y se utilizan únicamente para personalizar
          la experiencia dentro de la Aplicación.
        </Text>

        <Text style={styles.sectionTitle}>4. Uso de la Información</Text>
        <Text style={styles.text}>Utilizamos tus datos personales para:</Text>
        <Text style={styles.bullet}>• Generar rutinas y planes alimentarios personalizados</Text>
        <Text style={styles.bullet}>• Mejorar la funcionalidad y experiencia de la Aplicación</Text>
        <Text style={styles.bullet}>• Brindar soporte y comunicaciones relacionadas al servicio</Text>
        <Text style={styles.bullet}>• Analizar el uso de la Aplicación de forma interna</Text>

        <Text style={styles.sectionTitle}>5. Compartición de Datos</Text>
        <Text style={styles.bullet}>❌ No vendemos tus datos personales</Text>
        <Text style={styles.bullet}>❌ No compartimos tu información con terceros con fines comerciales</Text>
        <Text style={styles.bullet}>
          ✅ Podremos compartir datos únicamente cuando sea requerido por ley
          o autoridad competente
        </Text>

        <Text style={styles.sectionTitle}>6. Almacenamiento y Seguridad</Text>
        <Text style={styles.text}>
          Implementamos medidas técnicas y organizativas razonables para proteger
          tus datos personales contra accesos no autorizados, pérdida o uso
          indebido. Sin embargo, ningún sistema es 100% seguro.
        </Text>

        <Text style={styles.sectionTitle}>7. Conservación de los Datos</Text>
        <Text style={styles.text}>
          Conservamos tus datos personales únicamente durante el tiempo necesario
          para cumplir con las finalidades para las cuales fueron recolectados,
          o hasta que solicites su eliminación.
        </Text>

        <Text style={styles.sectionTitle}>8. Derechos del Usuario</Text>
        <Text style={styles.text}>
          De acuerdo con la Ley 25.326, tienes derecho a:
        </Text>
        <Text style={styles.bullet}>• Acceder a tus datos personales</Text>
        <Text style={styles.bullet}>• Solicitar la rectificación de datos incorrectos</Text>
        <Text style={styles.bullet}>• Solicitar la actualización o eliminación de tus datos</Text>
        <Text style={styles.bullet}>• Revocar tu consentimiento en cualquier momento</Text>
        <Text style={styles.text}>
          Puedes ejercer estos derechos desde la Aplicación o mediante los
          canales de contacto indicados.
        </Text>

        <Text style={styles.sectionTitle}>9. Cookies y Tecnologías Similares</Text>
        <Text style={styles.text}>
          Fitness App puede utilizar cookies o tecnologías similares únicamente
          con fines funcionales y analíticos, para mejorar la experiencia del
          usuario. No utilizamos cookies con fines publicitarios.
        </Text>

        <Text style={styles.sectionTitle}>10. Uso por Menores de Edad</Text>
        <Text style={styles.text}>
          Fitness App está destinada exclusivamente a personas mayores de 18
          años. No recopilamos intencionalmente datos de menores de edad.
        </Text>

        <Text style={styles.sectionTitle}>11. Cambios en la Política de Privacidad</Text>
        <Text style={styles.text}>
          Nos reservamos el derecho de modificar esta Política de Privacidad en
          cualquier momento. Los cambios serán notificados a través de la
          Aplicación.
        </Text>

        <Text style={styles.sectionTitle}>12. Contacto</Text>
        <Text style={styles.text}>
          Para consultas, solicitudes o reclamos relacionados con la privacidad
          de tus datos:
        </Text>
        <Text style={styles.bullet}>• Email: soporte@fitnessapp.com</Text>
        <Text style={styles.bullet}>• Desde la Aplicación: Sección "Ayuda" o "Contacto"</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>ℹ️ Información Legal:</Text> La Agencia de Acceso a la
            Información Pública, órgano de control de la Ley 25.326, tiene la
            atribución de atender las denuncias y reclamos que se interpongan en
            relación al incumplimiento de las normas sobre protección de datos
            personales.
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  infoBox: {
    backgroundColor: "#3A3A3C",
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#E5E5EA",
    lineHeight: 22,
  },
});

export default PrivacyPolicy;

