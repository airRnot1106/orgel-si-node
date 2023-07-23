import { z } from 'zod';

export const guildQueueParamSchema = z.object({
  guildId: z.string(),
});

export type GuildQueueParam = z.infer<typeof guildQueueParamSchema>;

export const postQueueBodySchema = z.object({
  requestId: z.string(),
});

export type PostQueueBody = z.infer<typeof postQueueBodySchema>;

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
