import { JSX, useEffect } from 'react';
import { Button, NativeModules, StyleSheet, Text, View } from 'react-native';

/**
 * Importamos el módulo nativo Java expuesto a React Native.
 * Este nombre debe coincidir con el definido en VpnModule.java:
 * getName() { return "VpnModule"; }
 */
const { VpnModule } = NativeModules;

export default function HomeScreen(): JSX.Element {

  useEffect(() => {
    // Verificación simple de que el módulo existe
    if (!VpnModule) {
      console.warn('VpnModule no está disponible');
    }
  }, []);

  /**
   * Llama al método Java startVpn()
   * Si el puente funciona, aparecerá un LOG en Android Studio
   */
  const handleStartIDS = () => {
    try {
      VpnModule.startVpn();
    } catch (error) {
      console.error('Error llamando a VpnModule:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>VectraGuard</Text>

      {/* Estado del sistema */}
      <Text style={styles.status}>System Status: Monitoring</Text>

      {/* Botón que activa el puente RN → Java */}
      <View style={styles.buttonContainer}>
        <Button
          title="Start IDS (Java Bridge)"
          onPress={handleStartIDS}
        />
      </View>

      {/* Info  */}
      <Text style={styles.info}>
        Press the button to invoke native Java IDS module.
      </Text>
    </View>
  );
}

/**
 * Estilos 100% React Native

 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
