import { z } from 'zod';

export const envSchema = z.object({
  DISCORD_TOKEN: z.string(),
});
