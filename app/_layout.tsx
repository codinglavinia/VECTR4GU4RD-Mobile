import { Redirect, Stack, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../firebase/config';
import { LanguageProvider } from '../src/context/LanguageContext';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const segments = useSegments();

  useEffect(() => {
    // Escucha el estado de autenticación del usuario (Firebase)
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Pantalla de carga mientras se valida la sesión
  if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <ActivityIndicator size="large" color="#00e5ff" />
    </View>
  );

  }

  const inAuthGroup = segments[0] === '(auth)';

  // Si NO hay usuario autenticado → redirigir al login
  if (!user && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  // Si HAY usuario autenticado y está en auth → ir a tabs
  if (user && inAuthGroup) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    // LanguageProvider hace disponible el idioma en toda la app
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" />
      </Stack>
    </LanguageProvider>
  );
}
