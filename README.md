#  VectraGuard

 Multiplatform Cybersecurity System (Mobile + Web + Backend + ML)

---

## 📱 Mobile Version (Expo / React Native)

VectraGuard Mobile is a **cross-platform cybersecurity monitoring application** focused on real-time network security analysis.

It integrates:
- 📡 Mobile network monitoring (Android via Expo)
- 🔔 Real-time alerts system
- ☁️ Firebase / backend integration
- 🧠 Machine Learning-based anomaly detection
- 📊 Web dashboard for visualization

---

### 🇬🇧 English
VectraGuard is a multiplatform cybersecurity system (mobile + web) designed for real-time network monitoring. It combines rule-based detection and Machine Learning techniques for traffic analysis, anomaly detection, and alert persistence.

### 🇪🇸 Español
VectraGuard es un sistema multiplataforma de ciberseguridad (móvil + web) diseñado para la monitorización de redes en tiempo real, combinando detección basada en reglas y Machine Learning para análisis de tráfico y alertas.

### 🇷🇴 Română
VectraGuard este un sistem multiplatformă de securitate cibernetică (mobil + web) pentru monitorizarea rețelelor în timp real.

### 🇩🇪 Deutsch
VectraGuard ist ein plattformübergreifendes Cybersicherheitsystem zur Echtzeit-Netzwerküberwachung.

---

## Mobile Architecture (Expo App)

```text
VectraGuard Mobile (Expo React Native)
 ├── app/                          # Expo Router screens
 │   ├── (auth)/                   # Login / Register
 │   ├── (dashboard)/             # Main dashboard
 │   └── components/              # UI components
 │
 ├── assets/                      # Images, icons, logos
 ├── services/                    # API / Firebase / backend calls
 ├── hooks/                       # Custom React hooks
 ├── utils/                       # Helpers & functions
 ├── context/                     # Global state management
 │
 ├── app.json                     # Expo configuration
 ├── eas.json                     # EAS Build configuration
 └── package.json
