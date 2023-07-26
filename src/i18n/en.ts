import type { IMessage } from '@/i18n/index';

export default {
  common: {
    internal_server_error: () => ':warning:Internal Server Error.',
    voice_channel: {
      not_joined: () => 'Please join the voice channel first.',
    },
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
  play: {
    description: () => 'Play the specified video',
    contents: {
      push: ({ title }) => `Added ${title} to the queue.`,
      interrupt: ({ title }) => `Interrupted ${title}.`,
      play: ({ title, user }) =>
        `
:musical_note: Now Playing :musical_note:
**Title**
${title}

${user}
`,
    },
    options: {
      video_url: {
        description: () => 'Youtube Video URL',
        invalid: () => 'Invalid URL. Please enter a valid URL.',
      },
      interrupt: {
        description: () => 'Interrupt at the head of the queue',
        invalid: () => 'Invalid option. Please enter a valid option.',
      },
    },
  },
  skip: {
    description: () => 'Skip the currently playing video',
  },
  resume: {
    description: () => 'Resume playback',
    not_paused: () => 'There is no video to play.',
    playing: () => 'Already playing.',
  },
  history: {
    description: () => 'Show the history of played videos',
    content: ({ requests }) =>
      `
:notebook_with_decorative_cover: **Playback History**
    ${requests
      .map(({ title, user }, index) => `${index + 1}. ${title} - ${user}`)
      .join('\n')}
`,
    options: {
      limit: {
        description: () => 'Number of histories to display',
        invalid: () => 'Invalid option. Please enter a valid option.',
      },
    },
  },
  queue: {
    description: () => 'Show the queue of videos to play',
    contents: {
      empty: () => 'There are no videos in the queue.',
      content: ({ requests }) => `
:headphones: **Playback Queue**
      ${requests
        .map(({ title, user }, index) => `${index + 1}. ${title} - ${user}`)
        .join('\n')}
`,
    },
  },
} as const satisfies IMessage;
