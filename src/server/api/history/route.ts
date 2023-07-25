import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { getPlayedRequest } from '@/libs/api/request';
import { getPlayedRequestArgsSchema } from '@/schema/request';

export const history = new Hono().get(
  '/:guildId',
  zValidator('param', getPlayedRequestArgsSchema, (result, c) => {
    if (!result.success) {
      return c.json({
        error: {
          message: result.error,
        },
      });
    }
  }),
  async (c) => {
    const { guildId } = c.req.valid('param');

    const getPlayedRequestResponse = await getPlayedRequest({
      guildId,
    });

    return c.jsonT(getPlayedRequestResponse, getPlayedRequestResponse.status);
  }
);
