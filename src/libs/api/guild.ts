import type { GuildPostBody } from '@/schema/api/guild';
import type { ApiResponse } from '@/types/api';
import type { GuildFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createGuild = async ({
  id,
  name,
}: GuildPostBody): Promise<ApiResponse<GuildFull>> => {
  try {
    const existsGuild = await prisma.guild.findUnique({
      where: {
        id,
      },
    });

    if (existsGuild) {
      return {
        status: 400,
        error: {
          message: 'Guild already exists',
        },
      };
    }

    const guild = await prisma.guild.create({
      data: {
        id,
        name,
        Setting: {
          connectOrCreate: {
            where: {
              id,
            },
            create: {
              language: 'en',
            },
          },
        },
      },
    });

    return {
      status: 200,
      data: guild,
    };
  } catch (e) {
    const message = e instanceof Error ? e : 'Internal Server Error';

    return {
      status: 500,
      error: {
        message,
      },
    };
  }
};
