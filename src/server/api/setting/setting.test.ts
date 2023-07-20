import { defineGuildFactory, defineSettingFactory } from '@/fabbrica';
import { root } from '@/server/server';

describe('setting api', () => {
  describe('language', () => {
    describe('GET /api/setting/:id/language', () => {
      it('should return 200', async () => {
        const guildFactory = defineGuildFactory();
        const { id } = await guildFactory.create();
        const settingFactory = defineSettingFactory({
          defaultData: {
            guild: {
              connect: {
                id,
              },
            },
          },
        });
        const { language } = await settingFactory.create();
        const res = await root.request(`/api/setting/${id}/language`, {
          method: 'GET',
        });

        expect(res.status).toBe(200);

        expect(await res.json()).toMatchObject({
          data: {
            id,
            language,
          },
        });
      });
    });

    describe('PATCH /api/setting/:id/language', () => {
      it('should return 200', async () => {
        const guildFactory = defineGuildFactory();
        const { id } = await guildFactory.create();
        const settingFactory = defineSettingFactory({
          defaultData: {
            guild: {
              connect: {
                id,
              },
            },
          },
        });
        await settingFactory.create();
        const res = await root.request(`/api/setting/${id}/language`, {
          method: 'PATCH',
          body: JSON.stringify({
            language: 'ja',
          }),
        });

        expect(res.status).toBe(200);

        expect(await res.json()).toMatchObject({
          data: {
            id,
            language: 'ja',
          },
        });
      });
    });
  });
});
