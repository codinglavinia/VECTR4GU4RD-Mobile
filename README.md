# VΞCTR4GU4RD - Cybersecurity Intelligence Platform
## 🎥 Mobile Demo :

<p align="center">
  <img src="assets/VΞCTR4GU4RD_Mobile version-demo.gif" width="360"/>
</p>

🇷🇴 VectraGuard este o aplicație multiplataformă de securitate cibernetică pentru dispozitive mobile și web. Aceasta integrează un sniffer de rețea nativ pentru Android, implementat în Java (VpnService) cu o interfață bazată pe React, combinând detectarea bazată pe reguli în Python cu tehnici de învățare automată pentru analiza traficului, monitorizarea în timp real și persistența alertelor.

🇪🇸 VectraGuard es una aplicación multiplataforma( móvil+ web) para la  monitorización de seguridad de red que va combinando detección basada en reglas de Machine Learning para alertas en tiempo real y analisis de logs impresas en reportes semanales. Este panel es la interfaz principal del sistema de detección de intrusiones (IDS) para monitorizar tráfico de red en tiempo real.

🇬🇧 VectraGuard is a multiplatform mobile and web cybersecurity application. It integrates a native Android network sniffer implemented in Java (VpnService) with a React-based interface, combining rule-based detection in Python and Machine Learning techniques for traffic analysis, real-time monitoring and alert persistence.

🇩🇪 VectraGuard ist eine Mobile- und Web-App zur Überwachung der Netzwerksicherheit, die regelbasierte Erkennung und Machine Learning für Echtzeitwarnungen kombiniert

---
## 📱 Arquitectura de la Aplicación Móvil

La aplicación móvil de **VΞCTR4GU4RD** ha sido desarrollada siguiendo una arquitectura modular y escalable basada en **React Native** y **Expo**, facilitando la separación de responsabilidades, la reutilización de componentes y el mantenimiento del código.

La aplicación integra funcionalidades nativas de Android mediante **Java (VpnService)** para la captura pasiva del tráfico de red, combinadas con servicios en la nube para la autenticación de usuarios, la persistencia de alertas y la sincronización en tiempo real.

```
VectraGuard Mobile :

├── app/
│   ├── (auth)/                  Pantallas de autenticación
│   ├── (tabs)/                  Navegación principal
│   ├── dashboard/               Panel principal
│   ├── alerts/                  Gestión de alertas IDS
│   ├── settings/                Configuración de la aplicación
│   └── login/                   Inicio de sesión
│
├── assets/                      Recursos estáticos (iconos, imágenes, GIFs)
├── components/                  Componentes reutilizables
├── context/                     Gestión del estado global
├── hooks/                       Hooks personalizados
├── services/                    Firebase, API y servicios externos
├── utils/                       Funciones auxiliares
│
├── android/
│   ├── VpnModule.java
│   └── PacketSnifferService.java
│
├── app.json                     Configuración de Expo
├── eas.json                     Configuración de EAS Build
└── package.json                 Dependencias del proyecto

```
##  Componentes principales :

📱 **Interfaz de usuario:** Desarrollada con **React Native** y **Expo** para ofrecer una experiencia multiplataforma moderna y fluida.

  🔐 **Autenticación:** Implementada mediante **Firebase Authentication**, proporcionando un acceso seguro y gestión de usuarios.

  ☁️ **Persistencia de datos:** Utiliza **Firebase Firestore** para el almacenamiento y sincronización de alertas en tiempo real.

  📡 **Captura de tráfico:** Basada en **Android VpnService**, implementado de forma nativa en **Java** para la monitorización pasiva del tráfico de red.

  **Detección de intrusiones:** Motor híbrido que combina **detección basada en reglas** y técnicas de **Machine Learning** para identificar actividades maliciosas.

  🌍 **Internacionalización:** Soporte multilenguaje con traducciones en **  Rumano,Español,Inglés y Alemán**.

  🔄 **Sincronización:** Comunicación en tiempo real con el **Dashboard Web de VΞCTR4GU4RD**, permitiendo la visualización centralizada de alertas e incidentes.


 Testing :

![JUnit](https://img.shields.io/badge/JUnit-5-25A162?style=for-the-badge)

### Caja negra (Black-Box Testing) :

* Validación de login con credenciales válidas e inválidas
* Pruebas de flujo de usuario (registro → dashboard → alertas)
* Simulación de ataques desde interfaz de red

### Caja blanca (White-Box Testing) :

* Testing de funciones de parsing de paquetes
* Validación de reglas IDS internas
* Cobertura de lógica de clasificación ML
* Tests unitarios en servicios backend

