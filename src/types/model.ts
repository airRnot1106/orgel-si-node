import type {
  GuildWithRelations,
  SettingWithRelations,
} from '@/schema/generated/prisma';

export type GuildFull = Pick<GuildWithRelations, 'id' | 'name'>;

export type SettingFull = Pick<
  SettingWithRelations,
  'id' | 'guild' | 'language'
>;
