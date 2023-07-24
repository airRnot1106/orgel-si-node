import { z } from 'zod';

import type { RequestFull } from '@/types/model';

export const requestParamSchema = z.object({
  id: z.string(),
});

export type RequestParam = z.infer<typeof requestParamSchema>;

export const postRequestBodySchema = z.object({
  guildId: z.string(),
  userId: z.string(),
  videoId: z.string(),
} satisfies Partial<Record<keyof RequestFull, unknown>>);

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

export const patchRequestPlayedAtBodySchema = z.object({
  playedAt: z.string().datetime(),
});

export type PatchRequestPlayedAtBody = z.infer<
  typeof patchRequestPlayedAtBodySchema
>;

export const getRequestArgsSchema = z.object({
  id: z.string(),
} satisfies Partial<Record<keyof RequestFull, unknown>>);

export type GetRequestArgs = z.infer<typeof getRequestArgsSchema>;

export const createRequestArgsSchema = z.object({
  guildId: z.string(),
  userId: z.string(),
  videoId: z.string(),
} satisfies Partial<Record<keyof RequestFull, unknown>>);

export type CreateRequestArgs = z.infer<typeof createRequestArgsSchema>;

export const updateRequestPlayedAtArgsSchema = z.object({
  id: z.string(),
  playedAt: z.string().datetime(),
} satisfies Partial<Record<keyof RequestFull, unknown>>);

export type UpdateRequestPlayedAtArgs = z.infer<
  typeof updateRequestPlayedAtArgsSchema
>;
