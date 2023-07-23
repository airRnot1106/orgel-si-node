import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { decreaseQueueOrder, pushQueue } from '@/libs/api/queue';
import { guildQueueParamSchema, postQueueBodySchema } from '@/schema/queue';

export const queue = new Hono()
  .post(
    '/:guild-id',
    zValidator('param', guildQueueParamSchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          400
        );
      }
    }),
    zValidator('json', postQueueBodySchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          400
        );
      }
    }),
    async (c) => {
      const { guildId } = c.req.valid('param');
      const { requestId } = c.req.valid('json');

      const pushQueueResponse = await pushQueue({
        guildId,
        requestId,
      });

      return c.jsonT(pushQueueResponse, pushQueueResponse.status);
    }
  )
  .patch(
    '/:guild-id/decrease-order',
    zValidator('param', guildQueueParamSchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          400
        );
      }
    }),
    async (c) => {
      const { guildId } = c.req.valid('param');

      const decreaseQueueOrderResponse = await decreaseQueueOrder({
        guildId,
      });

      return c.jsonT(
        decreaseQueueOrderResponse,
        decreaseQueueOrderResponse.status
      );
    }
  );
