import type { CreateVideoArgs } from '@/schema/video';
import type { ApiResponse } from '@/types/api';
import type { VideoFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createVideo = async ({
  id,
  title,
  description,
  url,
  channelId,
}: CreateVideoArgs): Promise<ApiResponse<VideoFull>> => {
  try {
    const existsChannel = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!existsChannel) {
      return {
        status: 422,
        error: {
          message: 'Channel not found',
        },
      };
    }

    const existsVideo = await prisma.video.findUnique({
      where: {
        id,
      },
    });

    if (existsVideo) {
      return {
        status: 409,
        error: {
          message: 'Video already exists',
        },
      };
    }

    const video = await prisma.video.create({
      data: {
        id,
        title,
        description,
        url,
        channelId,
      },
      include: {
        channel: true,
      },
    });

    return {
      status: 200,
      data: video,
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
