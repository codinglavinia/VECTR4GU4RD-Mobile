import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler'; // Importante para gestos en Android
import { enableScreens } from 'react-native-screens'; // Optimizador de pantallas nativas

enableScreens(true); // Activa la optimización nativa para Android

import App from './App';

registerRootComponent(App);