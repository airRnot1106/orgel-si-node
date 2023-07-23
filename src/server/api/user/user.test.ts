import { defineUserFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('user api', () => {
  describe('POST /api/user', () => {
    it('should create a user', async () => {
      const userFactory = defineUserFactory();
      const { id, name } = await userFactory.build();

      const res = await root.request('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
        }),
      });

      expect(res.status).toBe(200);
    });
  });
});
