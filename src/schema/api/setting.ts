import { z } from 'zod';

export const settingGetQuerySchema = z.object({
  id: z.string(),
});

export type SettingGetQuery = z.infer<typeof settingGetQuerySchema>;
