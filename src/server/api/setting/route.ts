import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { getLanguage, updateLanguage } from '@/libs/api/setting';
import {
  patchLanguageBodySchema,
  getSettingParamSchema,
} from '@/schema/setting';

export const setting = new Hono()
  .get(
    '/:id/language',
    zValidator('param', getSettingParamSchema, (result, c) => {
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

      const getLanguageResponse = await getLanguage({ id });

      return c.jsonT(getLanguageResponse, getLanguageResponse.status);
    }
  )
  .patch(
    '/:id/language',
    zValidator('param', getSettingParamSchema, (result, c) => {
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
    zValidator('json', patchLanguageBodySchema, (result, c) => {
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
      const { language } = c.req.valid('json');

      const updateLanguageResponse = await updateLanguage({ id, language });

      return c.jsonT(updateLanguageResponse, updateLanguageResponse.status);
    }
  );
