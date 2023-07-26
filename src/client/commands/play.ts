import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';
import ytdl from 'ytdl-core';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { play } from '@/libs/player';
import { VideoSchema } from '@/schema/generated/prisma';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).play.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t('en').play.description(),
      'ja': I18n.t('ja').play.description(),
    })
    .addStringOption((option) =>
      option
        .setName('video_url')
        .setDescription(
          I18n.t(
            convertLocaleToLanguage(DEFAULT_LOCALE)
          ).play.options.video_url.description()
        )
        .setDescriptionLocalizations({
          'en-US': I18n.t('en').play.options.video_url.description(),
          'ja': I18n.t('ja').play.options.video_url.description(),
        })
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName('interrupt')
        .setDescription(
          I18n.t(
            convertLocaleToLanguage(DEFAULT_LOCALE)
          ).play.options.interrupt.description()
        )
        .setDescriptionLocalizations({
          'en-US': I18n.t('en').play.options.interrupt.description(),
          'ja': I18n.t('ja').play.options.interrupt.description(),
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

    const { member } = interaction;
    if (!(member instanceof GuildMember)) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      await interaction.reply({
        content: I18n.t(language).common.voice_channel.not_joined(),
        ephemeral: true,
      });
      return;
    }

    const maybeVideoUrl = interaction.options.get('video_url')?.value;
    const parseVideoUrlResult = VideoSchema.shape.url.safeParse(maybeVideoUrl);
    if (
      !parseVideoUrlResult.success ||
      !ytdl.validateURL(parseVideoUrlResult.data)
    ) {
      await interaction.reply({
        content: I18n.t(language).play.options.video_url.invalid(),
        ephemeral: true,
      });
      return;
    }

    const videoUrl = parseVideoUrlResult.data;

    const videoInfo = (await ytdl.getBasicInfo(videoUrl)).videoDetails;
    const {
      videoId,
      title: videoTitle,
      description: videoDescription,
      author: {
        id: channelId,
        name: channelName,
        user: channelUser = 'unknown',
        channel_url: channelUrl,
      },
    } = videoInfo;

    const createChannelResponse = await (
      await hc.channel.$post({
        json: {
          id: channelId,
          name: channelName,
          user: channelUser,
          url: channelUrl,
        },
      })
    ).json();

    if (
      !(
        createChannelResponse.status === 200 ||
        createChannelResponse.status === 409
      )
    ) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const createVideoResponse = await (
      await hc.video.$post({
        json: {
          id: videoId,
          title: videoTitle,
          description: videoDescription ?? '',
          url: videoUrl,
          channelId,
        },
      })
    ).json();

    if (
      !(
        createVideoResponse.status === 200 || createVideoResponse.status === 409
      )
    ) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const { user } = interaction;
    const userId = user.id;
    const userName = user.toString();

    const createUserResponse = await (
      await hc.user.$post({
        json: {
          id: userId,
          name: userName,
        },
      })
    ).json();

    if (
      !(createUserResponse.status === 200 || createUserResponse.status === 409)
    ) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const createRequestResponse = await (
      await hc.request.$post({
        json: {
          guildId,
          userId,
          videoId,
        },
      })
    ).json();

    if (createRequestResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const { id: requestId } = createRequestResponse.data;

    const isInterrupt =
      (interaction.options.get('interrupt')?.value as boolean | undefined) ??
      false;

    const pushQueueResponse = await (
      await hc.queue[':guildId'].$post({
        param: { guildId },
        json: {
          requestId,
          isInterrupt,
        },
      })
    ).json();

    if (pushQueueResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: I18n.t(language).play.contents.push({ title: videoTitle }),
      ephemeral: true,
    });

    const connection = joinVoiceChannel({
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      channelId: voiceChannel.id,
      guildId,
      selfDeaf: true,
      selfMute: false,
    });

    await play(guildId, connection, voiceChannel);
  },
} as const satisfies SlashCommand;
