import type { ApiSuccessfulResponse } from '@/types/api';
import type { RequestFull } from '@/types/model';

import { defineRequestFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('history api', () => {
  describe('GET /api/history/:guildId', () => {
    it('should return 200', async () => {
      const requestFactory = defineRequestFactory({
        defaultData: {
          guild: {
            connectOrCreate: {
              create: {
                id: 'guildId',
                name: 'guildName',
              },
              where: {
                id: 'guildId',
              },
            },
          },
          user: {
            connectOrCreate: {
              create: {
                id: 'userId',
                name: 'userName',
              },
              where: {
                id: 'userId',
              },
            },
          },
          video: {
            connectOrCreate: {
              create: {
                id: 'videoId',
                title: 'videoTitle',
                description: 'videoDescription',
                url: 'videoUrl',
                channel: {
                  connectOrCreate: {
                    create: {
                      id: 'channelId',
                      name: 'channelName',
                      user: 'channelUser',
                      url: 'channelUrl',
                    },
                    where: {
                      id: 'channelId',
                    },
                  },
                },
              },
              where: {
                id: 'videoId',
              },
            },
          },
        },
      });

      await requestFactory.createList(10);

      await requestFactory.create({
        playedAt: new Date(),
      });
      await requestFactory.create({
        playedAt: new Date(),
      });

      const historyResponse = await root.request('/api/history/guildId', {
        method: 'GET',
      });

      expect(historyResponse.status).toBe(200);

      const history = (await historyResponse.json()) as ApiSuccessfulResponse<
        RequestFull[]
      >;

      expect(history.data).toHaveLength(2);
    });
  });
});
