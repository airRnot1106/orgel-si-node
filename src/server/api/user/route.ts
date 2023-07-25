import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createUser } from '@/libs/api/user';
import { postUserBodySchema } from '@/schema/user';

export const user = new Hono().post(
  '/',
  zValidator('json', postUserBodySchema, (result, c) => {
    if (!result.success) {
      return c.json({
        error: {
          message: result.error,
        },
      });
    }
  }),
  async (c) => {
    const { id, name } = c.req.valid('json');

    const createUserResponse = await createUser({
      id,
      name,
    });

    return c.jsonT(createUserResponse, createUserResponse.status);
  }
);
