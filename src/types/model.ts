import type { GuildWithRelations } from '@/schema/generated/prisma';

export type GuildFull = Pick<GuildWithRelations, 'id' | 'name'>;
