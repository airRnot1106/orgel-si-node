import { defineGuildFactory } from '@/fabbrica';
import prisma from '@/libs/prisma';

describe('guild model', () => {
  describe('create', () => {
    it('should create a guild', async () => {
      const guildFactory = defineGuildFactory();

      const guild = await guildFactory.create();

      expect(
        await prisma.guild.findUnique({
          where: {
            id: guild.id,
          },
        })
      ).toStrictEqual(guild);
    });
  });
});
