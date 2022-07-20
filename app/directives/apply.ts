import { applyAuthDirective } from './auth';
import { applyUppercaseDirective } from './uppercase';

export const applyDirectives = (schema) => {
  applyAuthDirective(schema, 'auth');
  applyUppercaseDirective(schema, 'uppercase');
};
