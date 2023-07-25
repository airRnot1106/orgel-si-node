import { defineChannelFactory, defineVideoFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('video api', () => {
  describe('POST /api/video', () => {
    it('should create a video', async () => {
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

      const { id, title, description } = await videoFactory.build();

      const url = 'https://www.youtube.example.com/watch?v=TEST';

      const res = await root.request('/api/video', {
        method: 'POST',
        body: JSON.stringify({
          id,
          title,
          description,
          url,
          channelId: channel.id,
        }),
      });

      expect(res.status).toBe(200);
    });
  });
});
