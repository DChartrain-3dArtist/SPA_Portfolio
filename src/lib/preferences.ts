import type { Language } from '@/contexts/language-context';
import type { Theme } from '@/contexts/theme-context';

export const LANGUAGE_COOKIE_NAME = 'language';
export const THEME_COOKIE_NAME = 'theme';

export const DEFAULT_LANGUAGE: Language = 'fr';
export const DEFAULT_THEME: Theme = 'dark';

export function isLanguage(value: string | undefined): value is Language {
  return value === 'fr' || value === 'en';
}

export function isTheme(value: string | undefined): value is Theme {
  return value === 'light' || value === 'dark';
}
