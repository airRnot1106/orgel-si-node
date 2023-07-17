import { z } from 'zod';

export const guildPostBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type GuildPostBody = z.infer<typeof guildPostBodySchema>;

export const guildDeleteBodySchema = z.object({
  id: z.string(),
});

export type GuildDeleteBody = z.infer<typeof guildDeleteBodySchema>;
