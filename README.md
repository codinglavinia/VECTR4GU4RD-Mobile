# VΞCTR4GU4RD - Cybersecurity Intelligence Platform- Mobile Version 

## 🇬🇧 English
VectraGuard is a multiplatform cybersecurity system (mobile + web) designed for real-time network monitoring. It combines rule-based detection and Machine Learning techniques for traffic analysis, anomaly detection, and alert persistence.

## 🇪🇸 Español
VectraGuard es un sistema multiplataforma de ciberseguridad (móvil + web) diseñado para la monitorización de redes en tiempo real, combinando detección basada en reglas y Machine Learning para análisis de tráfico y alertas.

## 🇷🇴 Română
VectraGuard este un sistem multiplatformă de securitate cibernetică (mobil + web) pentru monitorizarea rețelelor în timp real.

## 🇩🇪 Deutsch
VectraGuard ist ein plattformübergreifendes Cybersicherheitsystem zur Echtzeit-Netzwerküberwachung.

## 📱 Mobile Architecture (Expo React Native)

```text
VectraGuard Mobile
│
├── app/
│   ├── (auth)/                  Authentication screens
│   ├── (dashboard)/             Main application dashboard
│   └── components/              Reusable UI components
│
├── assets/                      Static assets (images, icons, logos)
├── services/                    Firebase, API and backend integrations
├── hooks/                       Custom React hooks
├── utils/                       Utility functions and helpers
├── context/                     Global state management
│
├── app.json                     Expo application configuration
├── eas.json                     EAS Build configuration
└── package.json                 Dependencies and project metadata
```



🧪 Testing :

### Caja negra (Black-box testing) :

* Validación de login con credenciales válidas e inválidas
* Pruebas de flujo de usuario (registro → dashboard → alertas)
* Simulación de ataques desde interfaz de red

### Caja blanca (White-box testing) :

* Testing de funciones de parsing de paquetes
* Validación de reglas IDS internas
* Cobertura de lógica de clasificación ML
* Tests unitarios en servicios backend

## Métricas de Evaluación IDS:

El sistema puede evaluarse mediante métricas estándar de ciberseguridad:

* 🎯 **True Positive Rate (TPR / Recall)**
* ⚠️ **False Positive Rate (FPR)**
* 📉 **Precision del modelo de detección**
* 📊 **F1-Score para balance de clasificación**
* ⏱️ Latencia de detección en tiempo real
