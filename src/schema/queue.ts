import { z } from 'zod';

export const guildQueueParamSchema = z.object({
  guildId: z.string(),
});

export type GuildQueueParam = z.infer<typeof guildQueueParamSchema>;

export const getQueueQuerySchema = z.object({
  count: z.string().regex(/^\d+$/),
});

export type GetQueueQuery = z.infer<typeof getQueueQuerySchema>;

export const postQueueBodySchema = z.object({
  requestId: z.string(),
});

export type PostQueueBody = z.infer<typeof postQueueBodySchema>;

export const getQueueArgsSchema = z.object({
  guildId: z.string(),
  count: z.number().min(1).nullable(),
});

export type GetQueueArgs = z.infer<typeof getQueueArgsSchema>;

export const pushQueueArgsSchema = z.object({
  guildId: z.string(),
  requestId: z.string(),
});

export type PushQueueArgs = z.infer<typeof pushQueueArgsSchema>;

export const decreaseQueueOrderArgsSchema = z.object({
  guildId: z.string(),
});

export type DecreaseQueueOrderArgs = z.infer<
  typeof decreaseQueueOrderArgsSchema
>;
