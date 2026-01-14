# Fitness App - Aplicación Móvil React Native

Esta es la versión móvil de la aplicación Fitness App, desarrollada con React Native y Expo para iOS y Android.

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI instalado globalmente: `npm install -g expo-cli`
- Para iOS: Xcode (solo en macOS)
- Para Android: Android Studio con Android SDK

## 🚀 Instalación

1. Navega a la carpeta `mobile`:
```bash
cd mobile
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃 Ejecutar la Aplicación

### Desarrollo

Para iniciar el servidor de desarrollo de Expo:
```bash
npm start
```

Esto abrirá el Metro Bundler en tu navegador. Luego puedes:

- **iOS**: Presiona `i` en la terminal o escanea el código QR con la app Expo Go en tu iPhone
- **Android**: Presiona `a` en la terminal o escanea el código QR con la app Expo Go en tu Android
- **Web**: Presiona `w` en la terminal

### Ejecutar en dispositivos específicos

```bash
# iOS (solo en macOS)
npm run ios

# Android
npm run android
```

## ⚙️ Configuración

### Configurar la URL del API

Edita el archivo `src/config.js` y actualiza la variable `API_BASE` con la URL de tu servidor:

```javascript
export const API_BASE = __DEV__ 
  ? "http://localhost:4000"  // Para desarrollo local
  : "https://tu-servidor.com"; // Para producción
```

**Nota importante**: Para dispositivos físicos, usa la IP local de tu máquina en lugar de `localhost`. Por ejemplo: `http://192.168.1.100:4000`

### Variables de Entorno

Puedes crear un archivo `.env` en la raíz de `mobile` para configurar variables de entorno (requiere `expo-constants` o similar).

## 📱 Estructura del Proyecto

```
mobile/
├── App.js                 # Componente principal y navegación
├── app.json              # Configuración de Expo
├── package.json          # Dependencias del proyecto
├── babel.config.js       # Configuración de Babel
├── src/
│   ├── components/       # Componentes de la aplicación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MainMenu.jsx
│   │   ├── Chatbot.jsx
│   │   ├── RutinaViewer.jsx
│   │   ├── DietaViewer.jsx
│   │   ├── ProfileEdit.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── TermsAndConditions.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── CustomAlert.jsx
│   │   └── ProtectedRoute.jsx
│   ├── hooks/            # Custom hooks
│   │   └── useAlert.js
│   ├── utils/            # Utilidades
│   │   └── storage.js
│   └── config.js         # Configuración (URL del API)
```

## 🔧 Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Herramientas y servicios para React Native
- **React Navigation**: Navegación entre pantallas
- **AsyncStorage**: Almacenamiento local persistente
- **React Hooks**: Gestión de estado y efectos

## 📦 Dependencias Principales

- `expo`: Framework Expo
- `react-native`: Framework React Native
- `@react-navigation/native`: Navegación
- `@react-navigation/native-stack`: Stack navigator
- `@react-native-async-storage/async-storage`: Almacenamiento local
- `react-native-safe-area-context`: Manejo de áreas seguras
- `react-native-screens`: Optimización de pantallas
- `react-native-gesture-handler`: Manejo de gestos

## 🏗️ Construir para Producción

### Android (APK)

```bash
expo build:android
```

### iOS (IPA)

```bash
expo build:ios
```

**Nota**: Para builds de producción, necesitarás configurar las credenciales en Expo.

## 🐛 Solución de Problemas

### Error de conexión al servidor

- Asegúrate de que el servidor esté corriendo
- Verifica que la URL en `src/config.js` sea correcta
- Para dispositivos físicos, usa la IP local en lugar de `localhost`
- Verifica que el firewall no esté bloqueando las conexiones

### Problemas con AsyncStorage

- Asegúrate de que `@react-native-async-storage/async-storage` esté instalado
- En algunos casos, puede ser necesario limpiar la caché: `expo start -c`

### Problemas de navegación

- Verifica que todas las rutas estén correctamente definidas en `App.js`
- Asegúrate de que los componentes estén correctamente importados

## 📝 Notas Importantes

1. **Almacenamiento**: La app usa AsyncStorage en lugar de localStorage (que es solo para web)
2. **Navegación**: Se usa React Navigation en lugar de React Router
3. **Estilos**: Se usa StyleSheet de React Native en lugar de CSS
4. **Componentes**: Los componentes HTML (`div`, `button`, etc.) se reemplazan por componentes de React Native (`View`, `TouchableOpacity`, etc.)

## 🔐 Seguridad

- Los tokens de autenticación se almacenan localmente usando AsyncStorage
- Las contraseñas nunca se almacenan, solo se envían al servidor para autenticación
- Todas las comunicaciones con el servidor deben usar HTTPS en producción

## 📄 Licencia

Este proyecto mantiene la misma licencia que el proyecto original.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las convenciones de código existentes.

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo o abre un issue en el repositorio.

