import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

import Login from './src/components/Login';
import Register from './src/components/Register';
import MainMenu from './src/components/MainMenu';
import ProfileEdit from './src/components/ProfileEdit';
import Chatbot from './src/components/Chatbot';
import RutinaViewer from './src/components/RutinaViewer';
import DietaViewer from './src/components/DietaViewer';
import ForgotPassword from './src/components/ForgotPassword';
import ResetPassword from './src/components/ResetPassword';
import TermsAndConditions from './src/components/TermsAndConditions';
import PrivacyPolicy from './src/components/PrivacyPolicy';
import ProtectedRoute from './src/components/ProtectedRoute';

const Stack = createNativeStackNavigator();

// Crear componentes protegidos
const ProtectedMainMenu = ProtectedRoute(MainMenu);
const ProtectedProfile = ProtectedRoute(ProfileEdit);
const ProtectedChatbot = ProtectedRoute(Chatbot);
const ProtectedRutinaViewer = ProtectedRoute(RutinaViewer);
const ProtectedDietaViewer = ProtectedRoute(DietaViewer);

// Componente de Error Boundary simple
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>Algo salió mal</Text>
          <Text style={errorStyles.text}>{this.state.error?.toString()}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#E5E5EA',
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' }
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="MainMenu" component={ProtectedMainMenu} />
          <Stack.Screen name="Profile" component={ProtectedProfile} />
          <Stack.Screen name="Chatbot" component={ProtectedChatbot} />
          <Stack.Screen name="RutinaViewer" component={ProtectedRutinaViewer} />
          <Stack.Screen name="DietaViewer" component={ProtectedDietaViewer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

