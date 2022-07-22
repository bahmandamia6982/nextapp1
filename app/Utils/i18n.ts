import i18next, { t } from 'i18next';
import { translations as English } from 'app/languages/en';
import { translations as Kurdish } from 'app/languages/ku';
import { initReactI18next } from 'react-i18next';

export const initializeI18Next = async () => {
  return await i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    pluralSeparator: '_',
    resources: {
      en: { translation: English },
      ku: { translation: Kurdish },
    },
  });
};
