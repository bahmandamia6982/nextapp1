import { t } from 'i18next';
import WPHash from 'wordpress-hash-node';

export const QueryResolvers = {
  Query: {
    token: async () => {
      const token = WPHash.HashPassword('bahman.world@gmail.com');
      return token;
    },
    direction: (parent, args, context) => {
      return t('direction', { lng: context.language });
    },
  },
};
