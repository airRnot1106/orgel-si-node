import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { LanguageSchema } from '@/schema/generated/prisma';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'setting',
  data: new SlashCommandBuilder()
    .setName('setting')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).setting.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t(convertLocaleToLanguage('en-US')).setting.description(),
      'ja': I18n.t(convertLocaleToLanguage('ja')).setting.description(),
    })
    .addSubcommand((sub) =>
      sub
        .setName('language')
        .setDescription(
          I18n.t(
            convertLocaleToLanguage(DEFAULT_LOCALE)
          ).setting.language.description()
        )
        .setDescriptionLocalizations({
          'en-US': I18n.t(
            convertLocaleToLanguage('en-US')
          ).setting.language.description(),
          'ja': I18n.t(
            convertLocaleToLanguage('ja')
          ).setting.language.description(),
        })
        .addStringOption((option) =>
          option
            .setName('language')
            .setDescription(
              I18n.t(
                convertLocaleToLanguage(DEFAULT_LOCALE)
              ).setting.language.options.language.description()
            )
            .setDescriptionLocalizations({
              'en-US': I18n.t(
                convertLocaleToLanguage('en-US')
              ).setting.language.options.language.description(),
              'ja': I18n.t(
                convertLocaleToLanguage('ja')
              ).setting.language.options.language.description(),
            })
        )
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

    const maybeTargetLanguage = interaction.options.get('language')?.value;
    const parseTargetLanguageResult =
      LanguageSchema.safeParse(maybeTargetLanguage);
    if (!parseTargetLanguageResult.success) {
      await interaction.reply({
        content: I18n.t(language).setting.language.options.language.invalid(),
        ephemeral: true,
      });
      return;
    }

    const targetLanguage = parseTargetLanguageResult.data;
    const updateLanguageResponse = await (
      await hc.setting[':id'].language.$patch({
        param: { id: guildId },
        json: {
          language: targetLanguage,
        },
      })
    ).json();

    if (updateLanguageResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const user = interaction.user.toString();

    await interaction.reply({
      content: I18n.t(targetLanguage).setting.language.options.language.content(
        {
          user,
          language: targetLanguage,
        }
      ),
      ephemeral: false,
    });
  },
} as const satisfies SlashCommand;
