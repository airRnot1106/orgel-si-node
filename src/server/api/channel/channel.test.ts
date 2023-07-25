import { defineChannelFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('channel api', () => {
  describe('POST /api/channel', () => {
    it('should create a channel', async () => {
      const channelFactory = defineChannelFactory();
      const { id, name, user } = await channelFactory.build();

      const url = 'https://www.youtube.example.com/channel/TEST';

      const res = await root.request('/api/channel', {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
          user,
          url,
        }),
      });

      expect(res.status).toBe(200);
    });
  });
});
