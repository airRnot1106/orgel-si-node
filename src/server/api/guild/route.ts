import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { createGuild, deleteGuild } from '@/libs/api/guild';
import { guildDeleteBodySchema, guildPostBodySchema } from '@/schema/api/guild';

export const guild = new Hono()
  .post(
    '/',
    zValidator('json', guildPostBodySchema, (result, c) => {
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
    '/',
    zValidator('json', guildDeleteBodySchema, (result, c) => {
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
      const { id } = c.req.valid('json');

      const deleteGuildResponse = await deleteGuild({ id });

      return c.jsonT(deleteGuildResponse, deleteGuildResponse.status);
    }
  );
