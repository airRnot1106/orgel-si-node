import { hc as honoClient } from 'hono/client';

import type { ApiType } from '@/server/server';

import { envSchema } from '@/schema/env';

const env = envSchema.parse(process.env);
const baseUrl = env.API_ENDPOINT;
const headers = {
  'Content-Type': 'application/json',
} as const;

export const hc = honoClient<ApiType>(baseUrl, {
  headers,
});
