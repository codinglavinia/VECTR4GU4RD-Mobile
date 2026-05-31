import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

type Lang = 'es' | 'en' | 'ro' | 'de';

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>('es');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
