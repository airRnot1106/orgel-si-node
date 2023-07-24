import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'history',
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).history.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t(convertLocaleToLanguage('en-US')).history.description(),
      'ja': I18n.t(convertLocaleToLanguage('ja')).history.description(),
    })
    .addNumberOption((option) =>
      option
        .setName('limit')
        .setDescription(
          I18n.t(
            convertLocaleToLanguage(DEFAULT_LOCALE)
          ).history.options.limit.description()
        )
        .setDescriptionLocalizations({
          'en-US': I18n.t(
            convertLocaleToLanguage('en-US')
          ).history.options.limit.description(),
          'ja': I18n.t(
            convertLocaleToLanguage('ja')
          ).history.options.limit.description(),
        })
    ),
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

    const maybeLimit = interaction.options.get('limit')?.value ?? '10';

    const limit = Number(maybeLimit);

    const historyRequestsResponse = await (
      await hc.history[':guildId'].$get({
        param: { guildId },
      })
    ).json();

    if (historyRequestsResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const historyRequests = historyRequestsResponse.data;

    const targetHistoryRequests = historyRequests
      .slice(0, limit)
      .map((historyRequest) => {
        const {
          video: { title },
          user: { name: user },
        } = historyRequest;
        return {
          title,
          user,
        };
      });

    await interaction.reply({
      content: I18n.t(language).history.content({
        requests: targetHistoryRequests,
      }),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
