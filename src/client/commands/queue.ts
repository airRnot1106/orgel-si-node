import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'queue',
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).queue.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t('en').queue.description(),
      'ja': I18n.t('ja').queue.description(),
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

    const getQueueResponse = await (
      await hc.queue[':guildId'].$get({
        param: { guildId },
        query: { count: '10' },
      })
    ).json();

    if (getQueueResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const queue = getQueueResponse.data;

    if (queue.length <= 0) {
      await interaction.reply({
        content: I18n.t(language).queue.contents.empty(),
        ephemeral: true,
      });
      return;
    }

    const requests = queue.map(({ request }) => {
      const {
        video: { title },
        user: { name: user },
      } = request;
      return { title, user };
    });

    await interaction.reply({
      content: I18n.t(language).queue.contents.content({ requests }),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
