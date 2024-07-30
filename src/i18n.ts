import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import heTranslations from './locales/he/translation.json';
import arTranslations from './locales/ar/translation.json';

// Define your translations resources
const resources = {
  en: {
    translation: enTranslations,
  },
  he: {
    translation: heTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
