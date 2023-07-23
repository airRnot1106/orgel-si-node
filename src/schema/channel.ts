import { z } from 'zod';

export const postChannelBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string().url(),
});

export type PostChannelBody = z.infer<typeof postChannelBodySchema>;

export const createChannelArgsSchema = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string().url(),
});

export type CreateChannelArgs = z.infer<typeof createChannelArgsSchema>;
