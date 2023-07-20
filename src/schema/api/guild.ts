import { z } from 'zod';

export const createGuildArgsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type CreateGuildArgs = z.infer<typeof createGuildArgsSchema>;

export const deleteGuildArgsSchema = z.object({
  id: z.string(),
});

export type DeleteGuildArgs = z.infer<typeof deleteGuildArgsSchema>;
