import { z } from 'zod';

import type { VideoFull } from '@/types/model';

export const postVideoBodySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  channelId: z.string(),
} satisfies Partial<Record<keyof VideoFull, unknown>>);

export const createVideoArgsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  channelId: z.string(),
} satisfies Partial<Record<keyof VideoFull, unknown>>);

export type CreateVideoArgs = z.infer<typeof createVideoArgsSchema>;
