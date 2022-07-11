import { t } from 'i18next';
import { sign } from 'jsonwebtoken';

export const QueryResolvers = {
  Query: {
    token: () => sign('bahman.world@gmail.com', 'damia'),
    direction: (parent, args, context) => {
      return t('direction', { lng: 'en' });
    },
  },
};
