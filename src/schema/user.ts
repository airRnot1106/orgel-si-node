import { z } from 'zod';

import type { UserFull } from '@/types/model';

export const createUserArgsSchema = z.object({
  id: z.string(),
  name: z.string(),
} satisfies Partial<Record<keyof UserFull, unknown>>);

export type CreateUserArgs = z.infer<typeof createUserArgsSchema>;

export const postUserBodySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type PostUserBody = z.infer<typeof postUserBodySchema>;
