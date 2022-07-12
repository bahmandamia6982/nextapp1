import i18next, { t } from 'i18next';
import EnglishTranslation from '../Languages/en';
import KurdishTranslation from '../Languages/ku';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: EnglishTranslation },
  ku: { translation: KurdishTranslation },
};

export const initializeI18Next = async () => {
  return await i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    pluralSeparator: '_',
    resources,
  });
};
