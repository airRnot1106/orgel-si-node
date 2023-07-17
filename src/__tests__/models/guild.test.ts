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

  describe('delete', () => {
    it('should delete a guild', async () => {
      expect(await prisma.guild.count()).toBe(0);

      const guildFactory = defineGuildFactory();

      const guild = await guildFactory.create();

      expect(await prisma.guild.count()).toBe(1);

      await prisma.guild.delete({
        where: {
          id: guild.id,
        },
      });

      expect(
        await prisma.guild.findUnique({
          where: {
            id: guild.id,
          },
        })
      ).toBeNull();
    });
  });
});
