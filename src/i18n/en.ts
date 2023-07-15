import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:Internal Server Error.',
  },
  hello: {
    description: () => 'Hello Orgel',
    content: () => 'Hello Orgel!',
  },
} as const satisfies IMessage;
