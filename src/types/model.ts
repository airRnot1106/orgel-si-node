import type {
  ChannelWithRelations,
  GuildWithRelations,
  SettingWithRelations,
  VideoWithRelations,
  User,
} from '@/schema/generated/prisma';

export type GuildFull = Pick<GuildWithRelations, 'id' | 'name'>;

export type SettingFull = Pick<
  SettingWithRelations,
  'id' | 'guild' | 'language'
>;

export type ChannelFull = Pick<
  ChannelWithRelations,
  'id' | 'name' | 'user' | 'url'
>;

export type VideoFull = Pick<
  VideoWithRelations,
  'id' | 'title' | 'description' | 'url' | 'channelId'
> & {
  channel: ChannelFull;
};

export type UserFull = Pick<User, 'id' | 'name'>;
