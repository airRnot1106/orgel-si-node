import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:Internal Server Error.',
  },
  hello: {
    description: () => 'Hello Orgel',
    content: () => 'Hello Orgel!',
  },
  setting: {
    description: () => 'Setting Orgel',
    language: {
      description: () => 'Change language',
      options: {
        language: {
          description: () => 'Language(en / ja)',
          invalid: () => 'Please specify en or ja for the language',
          content: ({ user, language }) =>
            `${user} changed the language to ${language}`,
        },
      },
    },
  },
} as const satisfies IMessage;
