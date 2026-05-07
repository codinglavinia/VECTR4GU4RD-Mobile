// Importamos los componentes básicos de React Native
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Este componente representa la pestaña "Explore"
// La usaremos como Dashboard de VectraGuard
export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* TÍTULO PRINCIPAL */}
      <Text style={styles.title}>VectraGuard Dashboard</Text>

      {/* SUBTÍTULO */}
      <Text style={styles.subtitle}>
        Sistema de Detección de Intrusiones (IDS)
      </Text>

      {/* SECCIÓN: ALERTAS RECIENTES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚨 Alertas recientes</Text>
        <Text style={styles.cardText}>• Intento de fuerza bruta</Text>
        <Text style={styles.cardText}>• Escaneo de puertos detectado</Text>
        <Text style={styles.cardText}>• Tráfico sospechoso</Text>
      </View>

      {/* SECCIÓN: DETALLE DE ALERTA (SIMULADA) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔍 Detalle de alerta</Text>
        <Text style={styles.cardText}>IP: 192.168.1.45</Text>
        <Text style={styles.cardText}>Hora: 18:42</Text>
        <Text style={styles.cardText}>Tipo: Port Scan</Text>
      </View>

      {/* SECCIÓN: ESTADO DEL SISTEMA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛡️ Estado del sistema</Text>
        <Text style={styles.statusOk}>Sistema activo y monitorizando</Text>
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>author: codinglavinia</Text>
    </ScrollView>
  );
}

/* =======================
   ESTILOS
   ======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 6,
  },

  subtitle: {
    color: '#9FA8DA',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#121A3A',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardText: {
    color: '#E0E0E0',
    marginBottom: 4,
  },

  statusOk: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  footer: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
