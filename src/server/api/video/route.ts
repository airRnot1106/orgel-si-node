import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createVideo } from '@/libs/api/video';
import { postVideoBodySchema } from '@/schema/video';

export const video = new Hono().post(
  '/',
  zValidator('json', postVideoBodySchema, (result, c) => {
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
    const { id, title, description, url, channelId } = c.req.valid('json');

    const createVideoResponse = await createVideo({
      id,
      title,
      description,
      url,
      channelId,
    });

    return c.jsonT(createVideoResponse, createVideoResponse.status);
  }
);
