import { z } from 'zod';

export const envSchema = z.object({
  API_ENDPOINT: z.string(),
  DISCORD_TOKEN: z.string(),
});
