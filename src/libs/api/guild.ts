import type { DeleteGuildArgs, CreateGuildArgs } from '@/schema/guild';
import type { ApiResponse } from '@/types/api';
import type { GuildFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createGuild = async ({
  id,
  name,
}: CreateGuildArgs): Promise<ApiResponse<GuildFull>> => {
  try {
    const existsGuild = await prisma.guild.findUnique({
      where: {
        id,
      },
    });

    if (existsGuild) {
      return {
        status: 409,
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

export const deleteGuild = async ({
  id,
}: DeleteGuildArgs): Promise<ApiResponse<null>> => {
  try {
    const existsGuild = await prisma.guild.findUnique({
      where: {
        id,
      },
    });

    if (!existsGuild) {
      return {
        status: 404,
        error: {
          message: 'Guild not found',
        },
      };
    }

    await prisma.guild.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      data: null,
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
