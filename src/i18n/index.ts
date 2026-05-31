import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from './translations';

// Create i18n instance
const i18n = new I18n(translations);

/*
  Idiomas soportados en ORDEN DE PRIORIDAD
  1) Español (España)
  2) English (UK)
  3) Română
  4) Deutsch
*/
const supportedLanguages = ['es', 'en', 'ro', 'de'];

// Por defecto usamos el PRIMER idioma de la lista
let locale = supportedLanguages[0]; // 'es'

try {
  /*
    expo-localization no siempre está bien tipado en TypeScript,
    por eso accedemos de forma defensiva.
  */
  const localizationAny = Localization as any;

  // Mobile + Web moderno
  if (
    typeof localizationAny.getLocales === 'function' &&
    localizationAny.getLocales()?.length > 0
  ) {
    const detected = localizationAny.getLocales()[0]?.languageCode;

    // Si el idioma del sistema está soportado, lo usamos
    if (supportedLanguages.includes(detected)) {
      locale = detected;
    }
  }
  // Fallback alternativo
  else if (typeof localizationAny.locale === 'string') {
    const detected = localizationAny.locale.split('-')[0];
    if (supportedLanguages.includes(detected)) {
      locale = detected;
    }
  }
} catch {
  // En caso de error total, mantenemos español como default
  locale = supportedLanguages[0];
}

// Aplicar idioma final
i18n.locale = locale;
i18n.enableFallback = true;

export default i18n;
