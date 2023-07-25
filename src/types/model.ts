import type {
  ChannelWithRelations,
  GuildWithRelations,
  SettingWithRelations,
  VideoWithRelations,
  UserWithRelations,
  RequestWithRelations,
  QueueWithRelations,
} from '@/schema/generated/prisma';

export type GuildFull = Pick<
  GuildWithRelations,
  'id' | 'name' | 'createdAt' | 'updatedAt'
>;

export type SettingFull = Pick<
  SettingWithRelations,
  'id' | 'guild' | 'language' | 'createdAt' | 'updatedAt'
>;

export type ChannelFull = Pick<
  ChannelWithRelations,
  'id' | 'name' | 'user' | 'url' | 'createdAt' | 'updatedAt'
>;

export type VideoFull = Pick<
  VideoWithRelations,
  | 'id'
  | 'title'
  | 'description'
  | 'url'
  | 'channelId'
  | 'createdAt'
  | 'updatedAt'
> & {
  channel: ChannelFull;
};

export type UserFull = Pick<
  UserWithRelations,
  'id' | 'name' | 'createdAt' | 'updatedAt'
>;

export type RequestFull = Pick<
  RequestWithRelations,
  | 'id'
  | 'guildId'
  | 'userId'
  | 'videoId'
  | 'playedAt'
  | 'createdAt'
  | 'updatedAt'
> & {
  guild: GuildFull;
  user: UserFull;
  video: VideoFull;
};

export type QueueFull = Pick<
  QueueWithRelations,
  'id' | 'requestId' | 'order' | 'createdAt' | 'updatedAt'
> & {
  request: RequestFull;
};
