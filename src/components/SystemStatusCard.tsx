import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";

export type SystemStatus = "secure" | "warning" | "critical";

export interface SystemStatusCardProps {
  status: SystemStatus;
  totalAlerts: number;
}

export default function SystemStatusCard({
  status,
  totalAlerts,
}: SystemStatusCardProps): ReactElement {
  const statusLabel: Record<SystemStatus, string> = {
    secure: "sistema seguro",
    warning: "actividad sospechosa",
    critical: "riesgo crítico",
  };

  const getStatusColor = (s: SystemStatus) => {
    switch (s) {
      case "secure": return "#10b981"; // green
      case "warning": return "#f59e0b"; // yellow
      case "critical": return "#ef4444"; // red
      default: return "#6b7280"; // gray
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: getStatusColor(status) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>estado del sistema</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.label, { color: getStatusColor(status) }]}>
          {statusLabel[status]}
        </Text>
        <Text style={styles.alertsText}>
          alertas registradas: <Text style={styles.alertsCount}>{totalAlerts}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 6,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingBottom: 8,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  body: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  alertsText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  alertsCount: {
    color: '#f9fafb',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
