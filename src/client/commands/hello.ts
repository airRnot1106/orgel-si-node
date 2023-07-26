import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { convertLocaleToLanguage } from '@/utils/locale';

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
    const languageResponse = await (
      await hc.setting[':id'].language.$get({
        param: { id: guildId },
      })
    ).json();
    if (languageResponse.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(languageResponse);
      const { locale } = interaction;
      await interaction.reply({
        content: I18n.t(
          convertLocaleToLanguage(locale)
        ).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const { language } = languageResponse.data;
    await interaction.reply({
      content: I18n.t(language).hello.content(),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
