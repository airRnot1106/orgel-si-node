import type {
  DecreaseQueueOrderArgs,
  GetQueueArgs,
  PushQueueArgs,
} from '@/schema/queue';
import type { ApiResponse } from '@/types/api';
import type { QueueFull } from '@/types/model';

import prisma from '@/libs/prisma';

export const getQueue = async ({
  guildId,
  count,
}: GetQueueArgs): Promise<ApiResponse<QueueFull[]>> => {
  try {
    const queueCount = await prisma.queue.count({
      where: {
        guildId,
      },
    });

    const queue = await prisma.queue.findMany({
      where: {
        guildId,
      },
      take: count ?? queueCount,
      orderBy: {
        order: 'asc',
      },
      include: {
        guild: true,
        request: {
          include: {
            guild: true,
            user: true,
            video: {
              include: {
                channel: true,
              },
            },
          },
        },
      },
    });

    return {
      status: 200,
      data: queue,
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

export const pushQueue = async ({
  guildId,
  requestId,
}: PushQueueArgs): Promise<ApiResponse<QueueFull>> => {
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

    const existsRequest = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!existsRequest) {
      return {
        status: 404,
        error: {
          message: 'Request not found',
        },
      };
    }

    const lastOrder = await prisma.queue.findFirst({
      where: {
        guildId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const order = lastOrder ? lastOrder.order + 1 : 0;

    const queue = await prisma.queue.create({
      data: {
        guildId,
        requestId,
        order,
      },
      include: {
        guild: true,
        request: {
          include: {
            guild: true,
            user: true,
            video: {
              include: {
                channel: true,
              },
            },
          },
        },
      },
    });

    return {
      status: 200,
      data: queue,
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

export const decreaseQueueOrder = async ({
  guildId,
}: DecreaseQueueOrderArgs): Promise<ApiResponse<{ count: number }>> => {
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

    const result = await prisma.queue.updateMany({
      where: {
        guildId,
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    await prisma.queue.deleteMany({
      where: {
        guildId,
        order: {
          lt: 0,
        },
      },
    });

    return {
      status: 200,
      data: result,
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
