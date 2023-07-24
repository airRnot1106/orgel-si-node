import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import {
  createRequest,
  getRequest,
  updateRequestPlayedAt,
} from '@/libs/api/request';
import {
  patchRequestPlayedAtBodySchema,
  postRequestBodySchema,
  requestParamSchema,
} from '@/schema/request';

export const request = new Hono()
  .post(
    '/',
    zValidator('json', postRequestBodySchema, (result, c) => {
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
      const { guildId, userId, videoId } = c.req.valid('json');

      const createRequestResponse = await createRequest({
        guildId,
        userId,
        videoId,
      });

      return c.jsonT(createRequestResponse, createRequestResponse.status);
    }
  )
  .get(
    '/:id',
    zValidator('param', requestParamSchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          404
        );
      }
    }),
    async (c) => {
      const { id } = c.req.valid('param');

      const getRequestResponse = await getRequest({ id });

      return c.jsonT(getRequestResponse, getRequestResponse.status);
    }
  )
  .patch(
    '/:id/played-at',
    zValidator('param', requestParamSchema, (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.error,
            },
          },
          404
        );
      }
    }),
    zValidator('json', patchRequestPlayedAtBodySchema, (result, c) => {
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
      const { id } = c.req.valid('param');
      const { playedAt } = c.req.valid('json');

      const updateRequestPlayedAtResponse = await updateRequestPlayedAt({
        id,
        playedAt,
      });

      return c.jsonT(
        updateRequestPlayedAtResponse,
        updateRequestPlayedAtResponse.status
      );
    }
  );
