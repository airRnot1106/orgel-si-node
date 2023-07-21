import { z } from 'zod';

export const postGuildBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type PostGuildBody = z.infer<typeof postGuildBodySchema>;

export const createGuildArgsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type CreateGuildArgs = z.infer<typeof createGuildArgsSchema>;

export const deleteGuildParamSchema = z.object({
  id: z.string(),
});

export const deleteGuildArgsSchema = z.object({
  id: z.string(),
});

export type DeleteGuildArgs = z.infer<typeof deleteGuildArgsSchema>;
