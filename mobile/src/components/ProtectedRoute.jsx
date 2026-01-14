import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../utils/storage';

const ProtectedRoute = (Component) => {
  return function ProtectedComponent(props) {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = await storage.getItem('token');
          if (!token || token !== "user-authenticated") {
            navigation.replace('Login');
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          navigation.replace('Login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [navigation]);

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0A84FF" />
        </View>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

export default ProtectedRoute;

