import { SlashCommandBuilder } from '@discordjs/builders';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  joinVoiceChannel,
} from '@discordjs/voice';
import { GuildMember } from 'discord.js';

import type { SlashCommand } from '@/types/command';
import type { AudioPlayer } from '@discordjs/voice';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { play, playerMap } from '@/libs/player';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export default {
  name: 'resume',
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription(
      I18n.t(convertLocaleToLanguage(DEFAULT_LOCALE)).resume.description()
    )
    .setDescriptionLocalizations({
      'en-US': I18n.t(convertLocaleToLanguage('en-US')).resume.description(),
      'ja': I18n.t(convertLocaleToLanguage('ja')).resume.description(),
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

    const getQueueResponse = await (
      await hc.queue[':guildId'].$get({
        param: { guildId },
        query: { count: '1' },
      })
    ).json();

    if (getQueueResponse.status !== 200) {
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const count = getQueueResponse.data.length;

    if (count <= 0) {
      await interaction.reply({
        content: I18n.t(language).resume.not_paused(),
        ephemeral: true,
      });
      return;
    }

    if (!playerMap.has(guildId)) {
      playerMap.set(guildId, createAudioPlayer());
    }

    const player = playerMap.get(guildId) as AudioPlayer;

    if (player.state.status !== AudioPlayerStatus.Idle) {
      await interaction.reply({
        content: I18n.t(language).resume.playing(),
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: '\u200B',
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
