import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';

export default {
  name: 'hello',
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription(I18n.t('en').hello.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('en').hello.description(),
      'ja': I18n.t('ja').hello.description(),
    }),
  execute: async (interaction) => {
    await interaction.reply({
      content: I18n.t('en').hello.content(),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
