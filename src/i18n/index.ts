import type { LanguageType } from '@/schema/generated/prisma';

import en from '@/i18n/en';
import ja from '@/i18n/ja';

export interface IMessage {
  common: {
    internal_server_error: () => string;
    voice_channel: {
      not_joined: () => string;
    };
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
  play: {
    description: () => string;
    contents: {
      push: (args: { title: string }) => string;
      interrupt: (args: { title: string }) => string;
      play: (args: { title: string; user: string }) => string;
    };
    options: {
      video_url: {
        description: () => string;
        invalid: () => string;
      };
      interrupt: {
        description: () => string;
        invalid: () => string;
      };
    };
  };
  skip: {
    description: () => string;
  };
  resume: {
    description: () => string;
    not_paused: () => string;
    playing: () => string;
  };
  history: {
    description: () => string;
    content: (args: { requests: { title: string; user: string }[] }) => string;
    options: {
      limit: {
        description: () => string;
        invalid: () => string;
      };
    };
  };
  queue: {
    description: () => string;
    contents: {
      empty: () => string;
      content: (args: {
        requests: { title: string; user: string }[];
      }) => string;
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
