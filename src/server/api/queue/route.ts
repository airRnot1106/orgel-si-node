import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import {
  decreaseQueueOrder,
  getQueue,
  interruptQueue,
  pushQueue,
} from '@/libs/api/queue';
import {
  getQueueQuerySchema,
  guildQueueParamSchema,
  postQueueBodySchema,
} from '@/schema/queue';

export const queue = new Hono()
  .get(
    '/:guildId',
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
    zValidator('query', getQueueQuerySchema, (result, c) => {
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
      const { count } = c.req.valid('query');

      const numberCount = Number(count);

      const getQueueResponse = await getQueue({
        guildId,
        count: numberCount,
      });

      return c.jsonT(getQueueResponse, getQueueResponse.status);
    }
  )
  .post(
    '/:guildId',
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
      const { requestId, isInterrupt } = c.req.valid('json');

      const pushQueueResponse = isInterrupt
        ? await interruptQueue({
            guildId,
            requestId,
          })
        : await pushQueue({
            guildId,
            requestId,
          });

      return c.jsonT(pushQueueResponse, pushQueueResponse.status);
    }
  )
  .patch(
    '/:guildId/decrease-order',
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
