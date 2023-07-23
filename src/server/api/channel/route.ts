import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createChannel } from '@/libs/api/channel';
import { postChannelBodySchema } from '@/schema/channel';

export const channel = new Hono().post(
  '/',
  zValidator('json', postChannelBodySchema, (result, c) => {
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
    const { id, name, user, url } = c.req.valid('json');

    const createChannelResponse = await createChannel({ id, name, user, url });

    return c.jsonT(createChannelResponse, createChannelResponse.status);
  }
);
