import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:致命的なエラーが発生しました。',
  },
  hello: {
    description: () => 'こんにちは、Orgel',
    content: () => 'こんにちは、Orgel!',
  },
} as const satisfies IMessage;
