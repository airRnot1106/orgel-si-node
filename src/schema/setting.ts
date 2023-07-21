import { z } from 'zod';

import { LanguageSchema, SettingSchema } from '@/schema/generated/prisma';

export const getSettingParamSchema = z.object({
  id: SettingSchema.shape.id,
});

export type GetSettingParam = z.infer<typeof getSettingParamSchema>;

export const getLanguageArgsSchema = z.object({
  id: z.string(),
});

export type GetLanguageArgs = z.infer<typeof getLanguageArgsSchema>;

export const patchLanguageBodySchema = z.object({
  language: LanguageSchema,
});

export type PatchLanguageBody = z.infer<typeof patchLanguageBodySchema>;

export const updateLanguageArgsSchema = z.object({
  id: z.string(),
  language: LanguageSchema,
});

export type UpdateLanguageArgs = z.infer<typeof updateLanguageArgsSchema>;
