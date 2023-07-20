import { z } from 'zod';

export const getLanguageArgsSchema = z.object({
  id: z.string(),
});

export type GetLanguageArgs = z.infer<typeof getLanguageArgsSchema>;
