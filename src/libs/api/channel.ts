import type { CreateChannelArgs } from '@/schema/channel';
import type { ApiResponse } from '@/types/api';
import type { ChannelFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const createChannel = async ({
  id,
  name,
  user,
  url,
}: CreateChannelArgs): Promise<ApiResponse<ChannelFull>> => {
  try {
    const existsChannel = await prisma.channel.findUnique({
      where: {
        id,
      },
    });

    if (existsChannel) {
      return {
        status: 409,
        error: {
          message: 'Channel already exists',
        },
      };
    }

    const channel = await prisma.channel.create({
      data: {
        id,
        name,
        user,
        url,
      },
    });

    return {
      status: 200,
      data: channel,
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
