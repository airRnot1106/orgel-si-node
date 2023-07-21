import type { LanguageType } from '@/schema/generated/prisma';

import en from '@/i18n/en';
import ja from '@/i18n/ja';

export interface IMessage {
  common: {
    internal_server_error: () => string;
  };
  hello: {
    description: () => string;
    content: () => string;
  };
  setting: {
    description: () => string;
    language: {
      description: () => string;
      options: {
        language: {
          description: () => string;
          invalid: () => string;
          content: (args: { user: string; language: string }) => string;
        };
      };
    };
  };
}

const messages = {
  en,
  ja,
} as const satisfies Record<LanguageType, IMessage>;

export class I18n {
  static t(language: LanguageType) {
    return messages[language];
  }
}
