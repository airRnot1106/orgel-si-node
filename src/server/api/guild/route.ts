import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createGuild, deleteGuild } from '@/libs/api/guild';
import { createGuildArgsSchema } from '@/schema/api/guild';

export const guild = new Hono()
  .post(
    '/',
    zValidator('json', createGuildArgsSchema, (result, c) => {
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
      const { id, name } = c.req.valid('json');

      const createGuildResponse = await createGuild({ id, name });

      return c.jsonT(createGuildResponse, createGuildResponse.status);
    }
  )
  .delete(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string(),
      }),
      (result, c) => {
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
      }
    ),
    async (c) => {
      const { id } = c.req.valid('param');

      const deleteGuildResponse = await deleteGuild({ id });

      return c.jsonT(deleteGuildResponse, deleteGuildResponse.status);
    }
  );
