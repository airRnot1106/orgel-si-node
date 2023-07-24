import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:致命的なエラーが発生しました。',
    voice_channel: {
      not_joined: () => '先にボイスチャンネルに参加してください。',
    },
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
  play: {
    description: () => '指定したURLの動画を再生します',
    contents: {
      push: ({ title }) => `${title}をキューに追加しました。`,
      interrupt: ({ title }) => `${title}を割り込み再生します。`,
      play: ({ title, user }) =>
        `
:musical_note: Now Playing :musical_note:
*タイトル*
${title}

${user}
`,
    },
    options: {
      video_url: {
        description: () => 'Youtubeの動画URL',
        invalid: () => '無効なURLです。有効なURLを入力してください。',
      },
      interrupt: {
        description: () => 'キューの先頭に割り込みます',
        invalid: () =>
          '無効なオプションです。有効なオプションを入力してください。',
      },
    },
  },
  skip: {
    description: () => '再生中の動画をスキップします',
  },
  resume: {
    description: () => '再生を再開します',
    not_paused: () => '再生する動画がありません。',
    playing: () => 'すでに再生中です。',
  },
} as const satisfies IMessage;
