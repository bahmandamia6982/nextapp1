import i18next, { t } from 'i18next';
import { translations as English } from '../languages/en';
import { translations as Kurdish } from '../languages/ku';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: English },
  ku: { translation: Kurdish },
};

export const initializeI18Next = async () => {
  return await i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    pluralSeparator: '_',
    resources,
  });
};
