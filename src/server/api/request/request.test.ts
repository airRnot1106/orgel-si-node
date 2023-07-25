import type { ApiSuccessfulResponse } from '@/types/api';
import type { RequestFull } from '@/types/model';

import {
  defineChannelFactory,
  defineVideoFactory,
  defineGuildFactory,
  defineUserFactory,
} from '@/fabbrica';
import { root } from '@/server/server';

describe('request api', () => {
  describe('POST /api/request', () => {
    it('should create a request', async () => {
      const channelFactory = defineChannelFactory({
        defaultData: {
          url: 'https://www.youtube.example.com/channel/TEST',
        },
      });

      const channel = await channelFactory.create();

      const videoFactory = defineVideoFactory({
        defaultData: {
          channel: {
            connect: {
              id: channel.id,
            },
          },
        },
      });

      const video = await videoFactory.create();

      const guildFactory = defineGuildFactory();

      const guild = await guildFactory.create();

      const userFactory = defineUserFactory();

      const user = await userFactory.create();

      const res = await root.request('/api/request', {
        method: 'POST',
        body: JSON.stringify({
          guildId: guild.id,
          userId: user.id,
          videoId: video.id,
        }),
      });

      expect(res.status).toBe(200);
    });
  });

  describe('PATCH /api/request/:id/played-at', () => {
    it('should update a request playedAt', async () => {
      const channelFactory = defineChannelFactory({
        defaultData: {
          url: 'https://www.youtube.example.com/channel/TEST',
        },
      });

      const channel = await channelFactory.create();

      const videoFactory = defineVideoFactory({
        defaultData: {
          channel: {
            connect: {
              id: channel.id,
            },
          },
        },
      });

      const video = await videoFactory.create();

      const guildFactory = defineGuildFactory();

      const guild = await guildFactory.create();

      const userFactory = defineUserFactory();

      const user = await userFactory.create();

      const res = await root.request('/api/request', {
        method: 'POST',
        body: JSON.stringify({
          guildId: guild.id,
          userId: user.id,
          videoId: video.id,
        }),
      });

      const {
        data: { id },
      } = (await res.json()) as unknown as ApiSuccessfulResponse<RequestFull>;

      const res2 = await root.request(`/api/request/${id}/played-at`, {
        method: 'PATCH',
        body: JSON.stringify({
          playedAt: new Date(),
        }),
      });

      expect(res2.status).toBe(200);
    });
  });
});
