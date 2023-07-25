import {
  createAudioPlayer,
  type AudioPlayer,
  type VoiceConnection,
  createAudioResource,
  StreamType,
  entersState,
  AudioPlayerStatus,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

import type { QueueFull } from '@/types/model';
import type { TextBasedChannel } from 'discord.js';

import { I18n } from '@/i18n';
import { hc } from '@/libs/apiClient';
import { DEFAULT_LOCALE, convertLocaleToLanguage } from '@/utils/locale';

export const playerMap = new Map<string, AudioPlayer>();

const waitReadyConnection = async (connection: VoiceConnection) =>
  new Promise<void>((resolve) => {
    setInterval(() => {
      if (connection.state.status === 'ready') {
        resolve();
      }
    }, 100);
  });

export const play = async (
  guildId: string,
  connection: VoiceConnection,
  textChannel: TextBasedChannel
) => {
  if (!playerMap.has(guildId)) {
    playerMap.set(guildId, createAudioPlayer());
  }

  const player = playerMap.get(guildId) as AudioPlayer;

  if (player.state.status !== AudioPlayerStatus.Idle) {
    return;
  }

  const getLanguageResponse = await (
    await hc.setting[':id'].language.$get({
      param: { id: guildId },
    })
  ).json();

  if (getLanguageResponse.status !== 200) {
    await textChannel.send({
      content: I18n.t(
        convertLocaleToLanguage(DEFAULT_LOCALE)
      ).common.internal_server_error(),
    });
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  const { language } = getLanguageResponse.data;

  const getQueueResponse = await (
    await hc.queue[':guildId'].$get({
      param: { guildId },
      query: { count: '100' },
    })
  ).json();
  if (getQueueResponse.status !== 200) {
    await textChannel.send({
      content: I18n.t(language).common.internal_server_error(),
    });
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  const queues = getQueueResponse.data;

  if (queues.length <= 0) {
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  connection.subscribe(player);

  const queue = queues[0] as QueueFull;

  const { request } = queue;

  const { user, video } = request;

  const stream = ytdl(video.url, {
    filter: (format) =>
      format.audioCodec === 'opus' && format.container === 'webm', // webm opus
    quality: 'highest',
    highWaterMark: 32 * 1024 * 1024,
  });

  const resource = createAudioResource(stream, {
    inputType: StreamType.WebmOpus,
  });

  await textChannel.send({
    content: I18n.t(language).play.contents.play({
      title: video.title,
      user: user.name,
    }),
  });

  player.play(resource);

  const updateRequestPlayedAtResponse = await (
    await hc.request[':id']['played-at'].$patch({
      param: {
        id: request.id,
      },
      json: {
        playedAt: new Date().toISOString(),
      },
    })
  ).json();

  if (updateRequestPlayedAtResponse.status !== 200) {
    await textChannel.send({
      content: I18n.t(language).common.internal_server_error(),
    });
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
  await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);

  const decreaseQueueOrderResponse = await (
    await hc.queue[':guildId']['decrease-order'].$patch({
      param: { guildId },
    })
  ).json();

  if (decreaseQueueOrderResponse.status !== 200) {
    await textChannel.send({
      content: I18n.t(language).common.internal_server_error(),
    });
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  await play(guildId, connection, textChannel);
};
