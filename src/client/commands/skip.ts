import { SlashCommandBuilder } from '@discordjs/builders';
import { createAudioPlayer } from '@discordjs/voice';

import type { SlashCommand } from '@/types/command';
import type { AudioPlayer } from '@discordjs/voice';

import { I18n } from '@/i18n';
import { playerMap } from '@/libs/player';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'skip',
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).skip.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t(convertLocaleToLanguage('en-US')).skip.description(),
      'ja': I18n.t(convertLocaleToLanguage('ja')).skip.description(),
    }),
  execute: async (interaction) => {
    const { guildId } = interaction;
    if (!guildId) {
      const { locale } = interaction;
      await interaction.reply({
        content: I18n.t(
          convertLocaleToLanguage(locale)
        ).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    if (!playerMap.has(guildId)) {
      playerMap.set(guildId, createAudioPlayer());
    }

    const player = playerMap.get(guildId) as AudioPlayer;

    if (player.state.status !== 'playing') {
      await interaction.reply({
        content: '\u200B',
        ephemeral: false,
      });
      return;
    }

    player.stop();

    await interaction.reply({
      content: '\u200B',
      ephemeral: false,
    });
  },
} as const satisfies SlashCommand;
