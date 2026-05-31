// App.tsx - Vectr4Gu4rd Mobile -User Interface-
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

// =========================
// 🌍 TRADUCCIONES COMPLETAS
// =========================

const translations: any = {
  es: {
    dashboard: "Monitor",
    threats: "Alertas",
    ai: "IA",
    devices: "Dispositivos",
    more: "Más",
    securityStatus: "Estado de Seguridad",
    protected: "PROTEGIDO",
    allSystemsOk: "Todos los sistemas operativos",
    activeThreats: "Amenazas Activas",
    risk: "Riesgo (IA)",
    monitoredDevices: "Dispositivos Monitoreados",
    uptime: "Uptime del Sistema",
    networkTraffic: "Tráfico de Red en Vivo",
    last24h: "Últimas 24 horas",
    recentAlerts: "Alertas Recientes",
    viewAll: "Ver todo",
    bruteForce: "Ataque de fuerza bruta detectado",
    loginAttempt: "Intento de inicio de sesión inusual",
    threatCenter: "Threat Center",
    active: "Activas",
    all: "Todas",
    critical: "Críticas",
    resolved: "Resueltas",
    investigate: "Investigar",
    blockIP: "Bloquear IP",
    portScan: "Escaneo de puertos",
    unusualTraffic: "Tráfico saliente inusual",
    newDevice: "Nuevo dispositivo conectado",
    details: "Ver Detalles",
    trustDevice: "Confiar Dispositivo",
    aiAnalysis: "AI Analysis",
    aiTitle: "ANÁLISIS DE IA",
    highRisk: "ALTO RIESGO",
    confidence: "Confianza de IA",
    analysisSummary: "RESUMEN DEL ANÁLISIS",
    summaryText: "El sistema ha detectado un ataque de fuerza bruta desde 203.0.113.45 dirigido al servicio SSH en el puerto 22. Este comportamiento coincide con patrones de ataque conocidos con un 92% de confianza.",
    recommendations: "RECOMENDACIONES",
    rec1: "Bloquear dirección IP 203.0.113.45",
    rec2: "Habilitar protección contra fail2ban",
    rec3: "Monitorear logs de autenticación",
    rec4: "Escanear sistema en busca de backdoors",
    runScan: "Ejecutar Escaneo Profundo",
    genReport: "Generar Reporte",
    deviceSummary: "Resumen de Dispositivos",
    totalDevices: "Total Dispositivos",
    online: "En Línea",
    warning: "Advertencia",
    offline: "Desconectado",
    search: "Buscar dispositivos...",
    logout: "Cerrar Sesión",
    profile: "Perfil SOC",
    settings: "Ajustes",
    operator: "OPERADOR SOC",
    user: "Email",
    pass: "Password",
    signin: "Sign In",
    tagline: "Secure access to your digital environment",
    createAccount: "Create account",
    forgotPass: "Forgot password?"
  },
  en: {
    dashboard: "Monitor",
    threats: "Alerts",
    ai: "AI",
    devices: "Devices",
    more: "More",
    securityStatus: "Security Status",
    protected: "PROTECTED",
    allSystemsOk: "All systems operational",
    activeThreats: "Active Threats",
    risk: "Risk (AI)",
    monitoredDevices: "Monitored Devices",
    uptime: "System Uptime",
    networkTraffic: "Live Network Traffic",
    last24h: "Last 24 hours",
    recentAlerts: "Recent Alerts",
    viewAll: "View all",
    bruteForce: "Brute force attack detected",
    loginAttempt: "Unusual login attempt",
    threatCenter: "Threat Center",
    active: "Active",
    all: "All",
    critical: "Critical",
    resolved: "Resolved",
    investigate: "Investigate",
    blockIP: "Block IP",
    portScan: "Port scanning",
    unusualTraffic: "Unusual outgoing traffic",
    newDevice: "New device connected",
    details: "View Details",
    trustDevice: "Trust Device",
    aiAnalysis: "AI Analysis",
    aiTitle: "AI ANALYSIS",
    highRisk: "HIGH RISK",
    confidence: "AI Confidence",
    analysisSummary: "ANALYSIS SUMMARY",
    summaryText: "The system has detected a brute force attack from 203.0.113.45 targeting the SSH service on port 22. This behavior matches known attack patterns with 92% confidence.",
    recommendations: "RECOMMENDATIONS",
    rec1: "Block IP address 203.0.113.45",
    rec2: "Enable fail2ban protection",
    rec3: "Monitor authentication logs",
    rec4: "Scan system for backdoors",
    runScan: "Execute Deep Scan",
    genReport: "Generate Report",
    deviceSummary: "Device Summary",
    totalDevices: "Total Devices",
    online: "Online",
    warning: "Warning",
    offline: "Offline",
    search: "Search devices...",
    logout: "Log Out",
    profile: "SOC Profile",
    settings: "Settings",
    operator: "SOC OPERATOR",
    user: "Email",
    pass: "Password",
    signin: "Sign In",
    tagline: "Secure access to your digital environment",
    createAccount: "Create account",
    forgotPass: "Forgot password?"
  },
  ro: {
    dashboard: "Monitor",
    threats: "Alerte",
    ai: "IA",
    devices: "Dispozitive",
    more: "Mai mult",
    securityStatus: "Stare Securitate",
    protected: "PROTEJAT",
    allSystemsOk: "Toate sistemele funcționale",
    activeThreats: "Amenințări Active",
    risk: "Risc (IA)",
    monitoredDevices: "Dispozitive Monitorizate",
    uptime: "Uptime Sistem",
    networkTraffic: "Trafic Rețea Live",
    last24h: "Ultimele 24 ore",
    recentAlerts: "Alerte Recente",
    viewAll: "Vezi tot",
    bruteForce: "Atac forță brută detectat",
    loginAttempt: "Tentativă autentificare neobișnuită",
    threatCenter: "Centru Amenințări",
    active: "Active",
    all: "Toate",
    critical: "Critice",
    resolved: "Rezolvate",
    investigate: "Investighează",
    blockIP: "Blochează IP",
    portScan: "Scanare porturi",
    unusualTraffic: "Trafic ieșire neobișuint",
    newDevice: "Dispozitiv nou conectat",
    details: "Vezi Detalii",
    trustDevice: "Încredere Dispozitiv",
    aiAnalysis: "Analiză IA",
    aiTitle: "ANALIZĂ IA",
    highRisk: "RISC RIDICAT",
    confidence: "Încredere IA",
    analysisSummary: "REZUMAT ANALIZĂ",
    summaryText: "Sistemul a detectat un atac de forță brută de la 203.0.113.45 vizând serviciul SSH pe portul 22. Acest comportament se potrivește cu modelele de atac cunoscute cu o încredere de 92%.",
    recommendations: "RECOMANDĂRI",
    rec1: "Blochează adresa IP 203.0.113.45",
    rec2: "Activează protecția fail2ban",
    rec3: "Monitorizează jurnalele de autentificare",
    rec4: "Scanează sistemul pentru backdoors",
    runScan: "Execută Scanare Profundă",
    genReport: "Generează Raport",
    deviceSummary: "Rezumat Dispozitive",
    totalDevices: "Total Dispozitive",
    online: "Online",
    warning: "Avertizare",
    offline: "Deconectat",
    search: "Caută dispozitive...",
    logout: "Ieșire",
    profile: "Profil SOC",
    settings: "Setări",
    operator: "OPERATOR SOC",
    user: "Email",
    pass: "Parolă",
    signin: "Autentificare",
    tagline: "Acces securizat la mediul tău digital",
    createAccount: "Crează cont",
    forgotPass: "Ai uitat parola?"
  },
  de: {
    dashboard: "Monitor",
    threats: "Alarme",
    ai: "KI",
    devices: "Geräte",
    more: "Mehr",
    securityStatus: "Sicherheitsstatus",
    protected: "GESCHÜTZT",
    allSystemsOk: "Alle Systeme betriebsbereit",
    activeThreats: "Aktive Bedrohungen",
    risk: "Risiko (KI)",
    monitoredDevices: "Überwachte Geräte",
    uptime: "System-Uptime",
    networkTraffic: "Live-Netzwerkverkehr",
    last24h: "Letzte 24 Stunden",
    recentAlerts: "Aktuelle Alarme",
    viewAll: "Alle ansehen",
    bruteForce: "Brute-Force-Angriff erkannt",
    loginAttempt: "Ungewöhnlicher Anmeldeversuch",
    threatCenter: "Bedrohungszentrum",
    active: "Aktiv",
    all: "Alle",
    critical: "Kritisch",
    resolved: "Gelöst",
    investigate: "Untersuchen",
    blockIP: "IP blockieren",
    portScan: "Portscanning",
    unusualTraffic: "Ungewöhnlicher ausgehender Verkehr",
    newDevice: "Neues Gerät enviado",
    details: "Details anzeigen",
    trustDevice: "Gerät vertrauen",
    aiAnalysis: "KI-Analyse",
    aiTitle: "KI-ANALYSE",
    highRisk: "HOHES RISIKO",
    confidence: "KI-Vertrauen",
    analysisSummary: "ANALYSEZUSAMMENFASSUNG",
    summaryText: "Das System hat einen Brute-Force-Angriff von 203.0.113.45 auf den SSH-Dienst an Port 22 erkannt. Dieses Verhalten stimmt mit 92 % Konfidenz mit bekannten Angriffsmustern überein.",
    recommendations: "EMPFEHLUNGEN",
    rec1: "IP-Adresse 203.0.113.45 blockieren",
    rec2: "fail2ban-Schutz aktivieren",
    rec3: "Authentifizierungsprotokolle überwachen",
    rec4: "System nach Backdoors scannen",
    runScan: "Tiefenscan ausführen",
    genReport: "Bericht erstellen",
    deviceSummary: "Geräteübersicht",
    totalDevices: "Geräte insgesamt",
    online: "Online",
    warning: "Warning",
    offline: "Offline",
    search: "Geräte suchen...",
    logout: "Abmelden",
    profile: "SOC-Profil",
    settings: "Einstellungen",
    operator: "SOC-OPERATOR",
    user: "Email",
    pass: "Passwort",
    signin: "Anmelden",
    tagline: "Sicherer Zugriff auf Ihre digitale Umgebung",
    createAccount: "Konto erstellen",
    forgotPass: "Passwort vergessen?"
  }
};

// =========================
// 🎨 TEMAS
// =========================

const themes = {
  dark: {
    bg: "#020617",
    card: "#0F172A",
    text: "#FFFFFF",
    muted: "#64748B",
    border: "#1E293B",
    accent: "#00E5FF",
    critical: "#FF4D6D",
    warning: "#F59E0B",
    safe: "#10B981",
    tabBg: "#020617",
    inputBg: "#0F172A",
    loginBtn: ["#5865F2", "#3B82F6"]
  },
  light: {
    bg: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    muted: "#94A3B8",
    border: "#E2E8F0",
    accent: "#007AFF",
    critical: "#FF4D6D",
    warning: "#F59E0B",
    safe: "#10B981",
    tabBg: "#FFFFFF",
    inputBg: "#FFFFFF",
    loginBtn: ["#007AFF", "#0056B3"]
  }
};

// =========================
// 🧩 COMPONENTES REUTILIZABLES
// =========================

const StatCard = ({ title, value, detail, color, theme }: any) => (
  <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
    <Text style={[styles.statTitle, { color: theme.muted }]}>{title}</Text>
    <Text style={[styles.statValue, { color: color || theme.text }]}>{value}</Text>
    {detail && <Text style={[styles.statDetail, { color: color || theme.muted }]}>{detail}</Text>}
  </View>
);

const IncidentCard = ({ title, ip, status, time, theme, t }: any) => (
  <View style={[styles.incidentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
    <View style={styles.incidentHeader}>
      <View style={[styles.incidentIconBox, { backgroundColor: 'rgba(255, 77, 109, 0.1)' }]}>
        <MaterialCommunityIcons name="security-network" size={24} color={status === 'CRÍTICA' || status === 'CRITICAL' ? theme.critical : theme.warning} />
      </View>
      <View style={styles.incidentInfo}>
        <View style={styles.incidentTitleRow}>
          <Text style={[styles.incidentTitle, { color: theme.text }]}>{title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 77, 109, 0.1)' }]}>
             <Text style={[styles.statusBadgeText, { color: theme.critical }]}>{status}</Text>
          </View>
        </View>
        <Text style={[styles.incidentIp, { color: theme.muted }]}>{ip}</Text>
        <Text style={[styles.incidentTime, { color: theme.muted }]}>{time}</Text>
      </View>
    </View>
    <View style={styles.incidentActions}>
      <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.border }]}>
        <Ionicons name="search" size={14} color={theme.text} />
        <Text style={[styles.actionBtnText, { color: theme.text }]}>{t.investigate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.critical }]}>
        <MaterialCommunityIcons name="block-helper" size={14} color={theme.critical} />
        <Text style={[styles.actionBtnText, { color: theme.critical }]}>{t.blockIP}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const DeviceItem = ({ name, ip, status, theme }: any) => (
  <View style={[styles.deviceItem, { borderBottomColor: theme.border }]}>
    <View style={styles.deviceIconBox}>
       <MaterialCommunityIcons name={name.includes('PC') ? 'monitor' : (name.includes('Servidor') ? 'database' : 'cellphone')} size={24} color={theme.accent} />
    </View>
    <View style={styles.deviceInfo}>
       <Text style={[styles.deviceName, { color: theme.text }]}>{name}</Text>
       <Text style={[styles.deviceIp, { color: theme.muted }]}>{ip}</Text>
       <Text style={[styles.deviceStatus, { color: status === 'Online' || status === 'En Línea' ? theme.safe : (status === 'Offline' || status === 'Desconectado' ? theme.muted : theme.warning) }]}>{status}</Text>
    </View>
    <MaterialCommunityIcons name="shield-check" size={24} color={theme.safe} />
  </View>
);

// =========================
// 🖥️ PANTALLAS
// =========================

function MonitorScreen({ theme, lang }: any) {
  const t = translations[lang];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={theme.darkMode ? "light-content" : "dark-content"} />
      <View style={styles.screenHeader}>
        <View>
          <Text style={[styles.brandName, { color: theme.text }]}>VECTRAGUARD</Text>
          <Text style={[styles.brandSub, { color: theme.accent }]}>Hybrid Cybersecurity</Text>
        </View>
        <View style={styles.headerIcons}>
           <Ionicons name="notifications-outline" size={24} color={theme.text} />
           <View style={styles.notifDot} />
        </View>
      </View>

      <Text style={[styles.pageTitle, { color: theme.text }]}>{t.dashboard}</Text>

      {/* SEGURIDAD STATUS */}
      <View style={[styles.securityStatusBox, { backgroundColor: theme.card }]}>
         <View style={styles.statusInfo}>
            <Text style={[styles.socLabelSmall, { color: theme.muted }]}>{t.securityStatus}</Text>
            <Text style={[styles.statusTextLarge, { color: theme.safe }]}>{t.protected}</Text>
            <Text style={[styles.socLabelSmall, { color: theme.muted }]}>{t.allSystemsOk}</Text>
         </View>
         <View style={styles.circleProgressBox}>
            <View style={[styles.outerCircle, { borderColor: theme.border }]}>
               <View style={[styles.innerCircle, { borderColor: theme.accent }]}>
                  <Ionicons name="shield-checkmark" size={40} color={theme.accent} />
               </View>
            </View>
         </View>
      </View>

      {/* GRID STATS */}
      <View style={styles.statsGrid}>
         <StatCard title={t.activeThreats} value="23" detail="↑ 12%" color={theme.critical} theme={theme} />
         <StatCard title={t.risk} value="78/100" detail="Alto" color={theme.warning} theme={theme} />
         <StatCard title={t.monitoredDevices} value="12" detail="Online" color={theme.accent} theme={theme} />
         <StatCard title={t.uptime} value="99.98%" detail="Excelente" color={theme.safe} theme={theme} />
      </View>

      {/* TRAFICO RED */}
      <View style={styles.chartSection}>
         <Text style={[styles.sectionTitle, { color: theme.text }]}>{t.networkTraffic}</Text>
         <Text style={[styles.sectionSub, { color: theme.muted }]}>{t.last24h}</Text>
         <View style={[styles.chartPlaceholder, { backgroundColor: theme.card }]}>
            <LinearGradient colors={['rgba(0, 229, 255, 0.1)', 'transparent']} style={styles.chartFill} />
            <View style={[styles.chartLine, { backgroundColor: theme.accent }]} />
            <View style={[styles.chartMarker, { backgroundColor: 'rgba(0, 229, 255, 0.1)' }]}><Text style={[styles.markerText, { color: theme.accent }]}>72.4%</Text></View>
         </View>
      </View>

      {/* ALERTAS RECIENTES */}
      <View style={styles.alertsSection}>
         <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t.recentAlerts}</Text>
            <TouchableOpacity><Text style={{color: theme.accent}}>{t.viewAll}</Text></TouchableOpacity>
         </View>
         <View style={[styles.simpleAlertCard, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons name="alert-decagram" size={24} color={theme.critical} />
            <View style={{marginLeft: 15, flex: 1}}>
               <Text style={[styles.alertText, { color: theme.text }]}>{t.bruteForce}</Text>
               <Text style={[styles.alertSub, { color: theme.muted }]}>203.0.113.45 • 2m ago</Text>
            </View>
         </View>
         <View style={[styles.simpleAlertCard, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons name="account-alert" size={24} color={theme.warning} />
            <View style={{marginLeft: 15, flex: 1}}>
               <Text style={[styles.alertText, { color: theme.text }]}>{t.loginAttempt}</Text>
               <Text style={[styles.alertSub, { color: theme.muted }]}>Usuario: admin • 15m ago</Text>
            </View>
         </View>
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
}

function ThreatCenterScreen({ theme, lang }: any) {
  const t = translations[lang];
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.darkMode ? "light-content" : "dark-content"} />
      <View style={styles.screenHeader}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t.threatCenter}</Text>
        <Ionicons name="filter" size={24} color={theme.text} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
         {['active', 'all', 'critical', 'resolved'].map((key) => (
            <TouchableOpacity key={key} style={[styles.filterChip, key === 'active' && {backgroundColor: 'rgba(0, 229, 255, 0.1)', borderColor: theme.accent}]}>
               <Text style={[styles.filterText, { color: key === 'active' ? theme.accent : theme.muted }]}>{t[key]}</Text>
            </TouchableOpacity>
         ))}
      </ScrollView>

      <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
         <IncidentCard title={t.bruteForce} ip="203.0.113.45" status={t.critical.toUpperCase()} time="2m ago" theme={theme} t={t} />
         <IncidentCard title={t.portScan} ip="198.51.100.23" status="ALTA" time="10m ago" theme={theme} t={t} />
         <IncidentCard title={t.unusualTraffic} ip="Usuario: john.doe" status="MEDIA" time="22m ago" theme={theme} t={t} />
         <View style={[styles.incidentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <View style={styles.incidentHeader}>
                <View style={[styles.incidentIconBox, {backgroundColor: 'rgba(0, 229, 255, 0.1)'}]}>
                    <Ionicons name="person-add" size={24} color={theme.accent} />
                </View>
                <View style={styles.incidentInfo}>
                    <View style={styles.incidentTitleRow}>
                        <Text style={[styles.incidentTitle, { color: theme.text }]}>{t.newDevice}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 229, 255, 0.1)' }]}>
                            <Text style={[styles.statusBadgeText, { color: theme.accent }]}>BAJA</Text>
                        </View>
                    </View>
                    <Text style={[styles.incidentIp, { color: theme.muted }]}>192.168.1.78</Text>
                    <Text style={[styles.incidentTime, { color: theme.muted }]}>45m ago</Text>
                </View>
             </View>
             <View style={styles.incidentActions}>
                <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.border }]}><Text style={[styles.actionBtnText, { color: theme.text }]}>{t.investigate}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.accent }]}><Text style={[styles.actionBtnText, { color: theme.accent }]}>{t.trustDevice}</Text></TouchableOpacity>
             </View>
         </View>
         <View style={{height: 120}} />
      </ScrollView>
    </View>
  );
}

function AIAnalysisScreen({ theme, lang }: any) {
  const t = translations[lang];
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.darkMode ? "light-content" : "dark-content"} />
      <View style={styles.screenHeader}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t.aiAnalysis}</Text>
        <MaterialCommunityIcons name="brain" size={24} color={theme.accent} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={[styles.aiMainCard, { backgroundColor: theme.card }]}>
            <View style={{flex: 1}}>
               <Text style={[styles.socLabelSmall, { color: theme.muted }]}>{t.aiTitle}</Text>
               <Text style={[styles.highRiskText, { color: theme.critical }]}>{t.highRisk}</Text>
               <Text style={[styles.socLabelSmall, { color: theme.muted, marginTop: 10 }]}>{t.confidence}</Text>
               <Text style={[styles.confidenceValue, { color: theme.accent }]}>92%</Text>
               <View style={styles.progressBar}><View style={[styles.progressFill, {width: '92%', backgroundColor: theme.accent}]} /></View>
            </View>
            <MaterialCommunityIcons name="brain" size={100} color="rgba(139, 92, 246, 0.3)" />
         </View>

         <View style={[styles.summaryBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.summaryTitle, { color: theme.muted }]}>{t.analysisSummary}</Text>
            <Text style={[styles.summaryContent, { color: theme.text }]}>{t.summaryText}</Text>
         </View>

         <View style={styles.recSection}>
            <Text style={[styles.summaryTitle, { color: theme.muted, marginBottom: 15 }]}>{t.recommendations}</Text>
            {[t.rec1, t.rec2, t.rec3, t.rec4].map((rec, i) => (
               <View key={i} style={styles.recItem}>
                  <Ionicons name="checkmark-circle" size={18} color={theme.safe} />
                  <Text style={[styles.recText, { color: theme.text }]}>{rec}</Text>
               </View>
            ))}
         </View>

         <TouchableOpacity style={styles.primaryBtn}>
            <LinearGradient colors={theme.loginBtn} style={styles.gradientBtn}>
               <Text style={styles.btnText}>{t.runScan}</Text>
            </LinearGradient>
         </TouchableOpacity>

         <TouchableOpacity style={[styles.secondaryBtn, { borderColor: theme.border, backgroundColor: theme.card }]}>
            <Ionicons name="scan-outline" size={20} color={theme.text} style={{marginRight: 10}} />
            <Text style={[styles.btnText, { color: theme.text }]}>{t.genReport}</Text>
         </TouchableOpacity>
         <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

function DevicesScreen({ theme, lang }: any) {
  const t = translations[lang];
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.darkMode ? "light-content" : "dark-content"} />
      <View style={styles.screenHeader}>
        <Ionicons name="menu" size={24} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>{t.devices}</Text>
        <Ionicons name="add" size={24} color={theme.text} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={[styles.deviceSummaryCard, { backgroundColor: theme.card }]}>
            <View>
               <Text style={[styles.socLabelSmall, { color: theme.muted }]}>{t.deviceSummary}</Text>
               <Text style={[styles.totalCount, { color: theme.text }]}>12</Text>
               <Text style={[styles.socLabelSmall, { color: theme.muted }]}>{t.totalDevices}</Text>
            </View>
            <View style={styles.donutBox}>
               <View style={[styles.donutInner, { borderColor: theme.border }]}>
                  <View style={[styles.donutSegment, { borderColor: theme.safe, transform: [{rotate: '0deg'}] }]} />
                  <View style={[styles.donutSegment, { borderColor: theme.warning, transform: [{rotate: '240deg'}] }]} />
               </View>
               <View style={styles.donutLegend}>
                  <View style={styles.legendItem}><View style={[styles.dotSmall, {backgroundColor: theme.safe}]} /><Text style={[styles.legendText, {color: theme.muted}]}>{t.online} 9</Text></View>
                  <View style={styles.legendItem}><View style={[styles.dotSmall, {backgroundColor: theme.warning}]} /><Text style={[styles.legendText, {color: theme.muted}]}>{t.warning} 2</Text></View>
                  <View style={styles.legendItem}><View style={[styles.dotSmall, {backgroundColor: theme.muted}]} /><Text style={[styles.legendText, {color: theme.muted}]}>{t.offline} 1</Text></View>
               </View>
            </View>
         </View>

         <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Ionicons name="search" size={20} color={theme.muted} />
            <TextInput placeholder={t.search} placeholderTextColor={theme.muted} style={{flex: 1, marginLeft: 10, color: theme.text}} />
         </View>

         <View style={styles.deviceList}>
            <DeviceItem name="Android Pixel 7" ip="192.168.1.15" status={t.online} theme={theme} />
            <DeviceItem name="Windows PC" ip="192.168.1.22" status={t.online} theme={theme} />
            <DeviceItem name="Servidor Web" ip="203.0.113.10" status={t.warning} theme={theme} />
            <DeviceItem name="Cámara IoT" ip="192.168.1.55" status={t.online} theme={theme} />
            <DeviceItem name="Servidor de Base de Datos" ip="203.0.113.20" status={t.offline} theme={theme} />
         </View>
         <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

// =========================
// 🚀 APP PRINCIPAL
// =========================

export default function App() {
  const [lang, setLang] = useState("es");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = isDarkMode ? themes.dark : themes.light;
  (theme as any).darkMode = isDarkMode;
  const t = translations[lang];

  if (!isLoggedIn) {
    return (
      <View style={[styles.loginContainer, { backgroundColor: theme.bg }]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <View style={styles.loginContent}>
           <Image source={require("./assets/logo.png")} style={styles.loginLogo} />
           <Text style={[styles.loginBrand, { color: theme.text }]}>VectraGuard</Text>
           
           <View style={styles.loginForm}>
              <TextInput 
                style={[styles.loginInput, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} 
                placeholder={t.user} 
                placeholderTextColor={theme.muted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput 
                style={[styles.loginInput, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text, marginTop: 15 }]} 
                placeholder={t.pass} 
                placeholderTextColor={theme.muted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              
              <TouchableOpacity 
                style={styles.loginBtnFull} 
                onPress={() => (email.toLowerCase()==='admin' && password==='admin') ? setIsLoggedIn(true) : Alert.alert("Error", "admin / admin")}
              >
                <LinearGradient colors={theme.loginBtn as [string, string, ...string[]]} style={styles.gradientBtn}>
                   <Text style={styles.loginBtnText}>{t.signin}</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={[styles.loginTagline, { color: theme.muted }]}>{t.tagline}</Text>
              
              <View style={styles.loginFooter}>
                 <TouchableOpacity><Text style={[styles.footerLink, { color: theme.accent }]}>{t.createAccount}</Text></TouchableOpacity>
                 <TouchableOpacity><Text style={[styles.footerLink, { color: theme.accent }]}>{t.forgotPass}</Text></TouchableOpacity>
              </View>
           </View>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.tabBg,
            borderTopColor: theme.border,
            height: 90,
            paddingBottom: 10
          },
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.muted,
        }}
      >
        <Tab.Screen name="Dashboard" options={{
           tabBarLabel: t.dashboard,
           tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />
        }}>
           {() => <MonitorScreen theme={theme} lang={lang} />}
        </Tab.Screen>

        <Tab.Screen name="Alerts" options={{
           tabBarLabel: t.threats,
           tabBarIcon: ({ color }: { color: string }) => <Ionicons name="notifications-outline" size={24} color={color} />
        }}>
           {() => <ThreatCenterScreen theme={theme} lang={lang} />}
        </Tab.Screen>

        <Tab.Screen name="AI" options={{
           tabBarIcon: ({ color }: { color: string }) => (
               <View style={styles.FABContainer}>
                  <View style={[styles.FABCircle, { backgroundColor: theme.card, borderColor: theme.accent }]}>
                     <MaterialCommunityIcons name="target" size={32} color={theme.accent} />
                  </View>
               </View>
           ),
           tabBarLabel: () => null
        }}>
           {() => <AIAnalysisScreen theme={theme} lang={lang} />}
        </Tab.Screen>

        <Tab.Screen name="Devices" options={{
           tabBarLabel: t.devices,
           tabBarIcon: ({ color }: { color: string }) => <Ionicons name="hardware-chip-outline" size={24} color={color} />
        }}>
           {() => <DevicesScreen theme={theme} lang={lang} />}
        </Tab.Screen>

        <Tab.Screen name="More" options={{
           tabBarLabel: t.more,
           tabBarIcon: ({ color }) => <Ionicons name="ellipsis-horizontal" size={24} color={color} />
        }}>
           {() => (
             <View style={[styles.container, { backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{color: theme.text, fontSize: 24, marginBottom: 20}}>{t.more}</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                   {['es', 'en', 'ro', 'de'].map(l => (
                      <TouchableOpacity key={l} onPress={() => setLang(l)} style={[styles.langBtn, { backgroundColor: lang === l ? theme.accent : theme.card }]}>
                         <Text style={{color: lang === l ? (isDarkMode ? '#000' : '#fff') : theme.text}}>{l.toUpperCase()}</Text>
                      </TouchableOpacity>
                   ))}
                </View>
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={[styles.primaryBtn, {width: 200, marginTop: 40}]}>
                   <LinearGradient colors={theme.loginBtn as unknown as readonly [string, string, ...string[]]} style={styles.gradientBtn}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>Toggle Theme</Text>
                   </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={[styles.secondaryBtn, {width: 200, marginTop: 20, borderColor: theme.critical, backgroundColor: theme.card}]}>
                   <Text style={{color: theme.critical, fontWeight: 'bold'}}>{t.logout}</Text>
                </TouchableOpacity>
             </View>
           )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  screenHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandName: { fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  brandSub: { fontSize: 10, fontWeight: 'bold' },
  headerIcons: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  notifDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF4D6D', position: 'absolute', top: 8, right: 8 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  securityStatusBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  statusInfo: { flex: 1 },
  socLabelSmall: { fontSize: 10, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  statusTextLarge: { fontSize: 32, fontWeight: '900', marginBottom: 5 },
  circleProgressBox: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center' },
  outerCircle: { width: 90, height: 90, borderRadius: 45, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 4, justifyContent: 'center', alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  statCard: { width: '48%', padding: 15, borderRadius: 15, borderWidth: 1, marginBottom: 15 },
  statTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  statValue: { fontSize: 22, fontWeight: 'bold' },
  statDetail: { fontSize: 11, fontWeight: 'bold', marginTop: 5 },
  chartSection: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  sectionSub: { fontSize: 12, marginBottom: 15 },
  chartPlaceholder: { height: 120, width: '100%', justifyContent: 'flex-end', borderRadius: 15, overflow: 'hidden' },
  chartFill: { height: 80, width: '100%' },
  chartLine: { height: 2, width: '100%', position: 'absolute', top: 40 },
  chartMarker: { position: 'absolute', top: 20, right: 50, padding: 5, borderRadius: 5 },
  markerText: { fontSize: 10, fontWeight: 'bold' },
  alertsSection: { marginTop: 30 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  simpleAlertCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 10 },
  alertText: { fontSize: 13, fontWeight: 'bold' },
  alertSub: { fontSize: 11, marginTop: 3 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  filterBar: { flexDirection: 'row', marginTop: 10, height: 40 },
  filterChip: { paddingHorizontal: 20, height: 35, borderRadius: 10, borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', marginRight: 10 },
  filterText: { fontSize: 13, fontWeight: 'bold' },
  incidentCard: { padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 15 },
  incidentHeader: { flexDirection: 'row' },
  incidentIconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  incidentInfo: { flex: 1, marginLeft: 15 },
  incidentTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  incidentTitle: { fontSize: 14, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusBadgeText: { fontSize: 10, fontWeight: 'bold' },
  incidentIp: { fontSize: 12, marginTop: 5 },
  incidentTime: { fontSize: 11, marginTop: 5 },
  incidentActions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  actionBtn: { flex: 1, height: 40, borderRadius: 10, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
  actionBtnText: { fontSize: 12, fontWeight: 'bold' },
  aiMainCard: { padding: 25, borderRadius: 25, flexDirection: 'row', alignItems: 'center' },
  highRiskText: { fontSize: 28, fontWeight: '900' },
  confidenceValue: { fontSize: 28, fontWeight: '900' },
  progressBar: { height: 6, backgroundColor: 'rgba(128,128,128,0.1)', borderRadius: 3, marginTop: 15 },
  progressFill: { height: '100%', borderRadius: 3 },
  summaryBox: { marginTop: 30, padding: 20, borderRadius: 20 },
  summaryTitle: { fontSize: 12, fontWeight: '900', letterSpacing: 1, opacity: 0.6 },
  summaryContent: { fontSize: 14, lineHeight: 22, marginTop: 10 },
  recSection: { marginTop: 30 },
  recItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  recText: { fontSize: 14, marginLeft: 12 },
  primaryBtn: { marginTop: 40, height: 60, borderRadius: 18, overflow: 'hidden' },
  gradientBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  secondaryBtn: { marginTop: 15, height: 50, borderRadius: 15, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  deviceSummaryCard: { padding: 25, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-between' },
  totalCount: { fontSize: 40, fontWeight: '900' },
  donutBox: { alignItems: 'flex-end' },
  donutInner: { width: 80, height: 80, borderRadius: 40, borderWidth: 8, justifyContent: 'center', alignItems: 'center' },
  donutSegment: { position: 'absolute', width: 80, height: 80, borderRadius: 40, borderWidth: 8, borderTopColor: 'transparent', borderRightColor: 'transparent' },
  donutLegend: { marginTop: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  dotSmall: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  legendText: { fontSize: 11, fontWeight: 'bold' },
  searchBar: { height: 50, borderRadius: 15, borderWidth: 1, marginTop: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  deviceList: { marginTop: 25 },
  deviceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  deviceIconBox: { width: 45, height: 45, borderRadius: 12, backgroundColor: 'rgba(128,128,128,0.05)', justifyContent: 'center', alignItems: 'center' },
  deviceInfo: { flex: 1, marginLeft: 15 },
  deviceName: { fontSize: 15, fontWeight: 'bold' },
  deviceIp: { fontSize: 12, marginTop: 2 },
  deviceStatus: { fontSize: 11, fontWeight: 'bold', marginTop: 2 },
  FABContainer: { position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'center' },
  FABCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 15 },
  langBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 },
  loginContainer: { flex: 1, justifyContent: 'center' },
  loginContent: { padding: 40, alignItems: 'center' },
  loginLogo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 20 },
  loginBrand: { fontSize: 32, fontWeight: 'bold', marginBottom: 40 },
  loginForm: { width: '100%' },
  loginInput: { height: 55, borderRadius: 12, borderWidth: 1, paddingHorizontal: 20, fontSize: 16 },
  loginBtnFull: { height: 60, borderRadius: 12, overflow: 'hidden', marginTop: 25 },
  loginBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  loginTagline: { marginTop: 25, textAlign: 'center', fontSize: 13 },
  loginFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, width: '100%' },
  footerLink: { fontSize: 14, fontWeight: '500' }
});