import { z } from 'zod';

export const guildPostBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type GuildPostBody = z.infer<typeof guildPostBodySchema>;
