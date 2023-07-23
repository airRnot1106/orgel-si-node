import type {
  CreateRequestArgs,
  UpdateRequestPlayedAtArgs,
} from '@/schema/request';
import type { ApiResponse } from '@/types/api';
import type { RequestFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createRequest = async ({
  guildId,
  userId,
  videoId,
}: CreateRequestArgs): Promise<ApiResponse<RequestFull>> => {
  try {
    const existsGuild = await prisma.guild.findUnique({
      where: {
        id: guildId,
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

    const existsUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existsUser) {
      return {
        status: 404,
        error: {
          message: 'User not found',
        },
      };
    }

    const existsVideo = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!existsVideo) {
      return {
        status: 404,
        error: {
          message: 'Video not found',
        },
      };
    }

    const request = await prisma.request.create({
      data: {
        guildId,
        userId,
        videoId,
      },
      include: {
        guild: true,
        user: true,
        video: {
          include: {
            channel: true,
          },
        },
      },
    });

    return {
      status: 200,
      data: request,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';

    return {
      status: 500,
      error: {
        message,
      },
    };
  }
};

export const updateRequestPlayedAt = async ({
  id,
  playedAt,
}: UpdateRequestPlayedAtArgs): Promise<ApiResponse<RequestFull>> => {
  try {
    const request = await prisma.request.update({
      where: {
        id,
      },
      data: {
        playedAt,
      },
      include: {
        guild: true,
        user: true,
        video: {
          include: {
            channel: true,
          },
        },
      },
    });

    return {
      status: 200,
      data: request,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';

    return {
      status: 500,
      error: {
        message,
      },
    };
  }
};
