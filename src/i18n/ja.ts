import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:致命的なエラーが発生しました。',
  },
  hello: {
    description: () => 'こんにちは、Orgel',
    content: () => 'こんにちは、Orgel!',
  },
  setting: {
    description: () => 'Orgelの設定を変更します',
    language: {
      description: () => '言語を変更します',
      options: {
        language: {
          description: () => '言語(en / ja)',
          invalid: () => '言語はenかjaを指定してください',
          content: ({ user, language }) =>
            `${user}が言語を${language}に変更しました`,
        },
      },
    },
  },
} as const satisfies IMessage;
