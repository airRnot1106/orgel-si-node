import type { LanguageType } from '@/schema/generated/prisma';
import type { LocaleString } from 'discord.js';

export const DEFAULT_LOCALE = 'en-US' as const satisfies LocaleString;

export const localeMap = {
  'en-US': 'en',
  'ja': 'ja',
} as const satisfies Partial<Record<LocaleString, LanguageType>>;

export const convertLocaleToLanguage = (locale: LocaleString) => {
  switch (locale) {
    case 'en-US':
      return localeMap[locale];
    case 'ja':
      return localeMap[locale];
    default:
      return localeMap[DEFAULT_LOCALE];
  }
};
