import { defineGuildFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('guild api', () => {
  describe('POST /api/guild', () => {
    it('should create a guild', async () => {
      const guildFactory = defineGuildFactory();
      const { id, name } = await guildFactory.build();

      const res = await root.request('/api/guild', {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
        }),
      });

      expect(res.status).toBe(200);
    });

    it('should return 409 if guild already exists', async () => {
      const guildFactory = defineGuildFactory();
      const { id, name } = await guildFactory.create();

      const res = await root.request('/api/guild', {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
        }),
      });

      expect(res.status).toBe(409);
    });
  });

  describe('DELETE /api/guild', () => {
    it('should delete a guild', async () => {
      const guildFactory = defineGuildFactory();
      const { id } = await guildFactory.create();

      const res = await root.request(`/api/guild/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        }),
      });

      expect(res.status).toBe(200);
    });

    it('should return 404 if guild does not exist', async () => {
      const guildFactory = defineGuildFactory();
      const { id } = await guildFactory.build();

      const res = await root.request(`/api/guild/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        }),
      });

      expect(res.status).toBe(404);
    });
  });
});
