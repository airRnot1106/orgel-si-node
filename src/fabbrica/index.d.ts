import type { Guild } from '@prisma/client';
import type { Setting } from '@prisma/client';
import type { Channel } from '@prisma/client';
import type { Video } from '@prisma/client';
import type { User } from '@prisma/client';
import type { Request } from '@prisma/client';
import type { Queue } from '@prisma/client';
import type { Language } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Resolver } from '@quramy/prisma-fabbrica/lib/internal';
export {
  initialize,
  resetSequence,
  registerScalarFieldValueGenerator,
  resetScalarFieldValueGenerator,
} from '@quramy/prisma-fabbrica/lib/internal';
type BuildDataOptions = {
  readonly seq: number;
};
type GuildSettingFactory = {
  _factoryFor: 'Setting';
  build: () => PromiseLike<
    Prisma.SettingCreateNestedOneWithoutGuildInput['create']
  >;
};
type GuildFactoryDefineInput = {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Setting?:
    | GuildSettingFactory
    | Prisma.SettingCreateNestedOneWithoutGuildInput;
  Request?: Prisma.RequestCreateNestedManyWithoutGuildInput;
  Queue?: Prisma.QueueCreateNestedManyWithoutGuildInput;
};
type GuildFactoryDefineOptions = {
  defaultData?: Resolver<GuildFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<GuildFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type GuildTraitKeys<TOptions extends GuildFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface GuildFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Guild';
  build(
    inputData?: Partial<Prisma.GuildCreateInput>
  ): PromiseLike<Prisma.GuildCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.GuildCreateInput>
  ): PromiseLike<Prisma.GuildCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.GuildCreateInput>[]
  ): PromiseLike<Prisma.GuildCreateInput[]>;
  pickForConnect(inputData: Guild): Pick<Guild, 'id'>;
  create(inputData?: Partial<Prisma.GuildCreateInput>): PromiseLike<Guild>;
  createList(
    inputData: number | readonly Partial<Prisma.GuildCreateInput>[]
  ): PromiseLike<Guild[]>;
  createForConnect(
    inputData?: Partial<Prisma.GuildCreateInput>
  ): PromiseLike<Pick<Guild, 'id'>>;
}
export interface GuildFactoryInterface<
  TOptions extends GuildFactoryDefineOptions = GuildFactoryDefineOptions,
> extends GuildFactoryInterfaceWithoutTraits {
  use(
    name: GuildTraitKeys<TOptions>,
    ...names: readonly GuildTraitKeys<TOptions>[]
  ): GuildFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Guild} model.
 *
 * @param options
 * @returns factory {@link GuildFactoryInterface}
 */
export declare function defineGuildFactory<
  TOptions extends GuildFactoryDefineOptions,
>(options?: TOptions): GuildFactoryInterface<TOptions>;
type SettingguildFactory = {
  _factoryFor: 'Guild';
  build: () => PromiseLike<
    Prisma.GuildCreateNestedOneWithoutSettingInput['create']
  >;
};
type SettingFactoryDefineInput = {
  language?: Language;
  createdAt?: Date;
  updatedAt?: Date;
  guild: SettingguildFactory | Prisma.GuildCreateNestedOneWithoutSettingInput;
};
type SettingFactoryDefineOptions = {
  defaultData: Resolver<SettingFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<SettingFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type SettingTraitKeys<TOptions extends SettingFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface SettingFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Setting';
  build(
    inputData?: Partial<Prisma.SettingCreateInput>
  ): PromiseLike<Prisma.SettingCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.SettingCreateInput>
  ): PromiseLike<Prisma.SettingCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.SettingCreateInput>[]
  ): PromiseLike<Prisma.SettingCreateInput[]>;
  pickForConnect(inputData: Setting): Pick<Setting, 'id'>;
  create(inputData?: Partial<Prisma.SettingCreateInput>): PromiseLike<Setting>;
  createList(
    inputData: number | readonly Partial<Prisma.SettingCreateInput>[]
  ): PromiseLike<Setting[]>;
  createForConnect(
    inputData?: Partial<Prisma.SettingCreateInput>
  ): PromiseLike<Pick<Setting, 'id'>>;
}
export interface SettingFactoryInterface<
  TOptions extends SettingFactoryDefineOptions = SettingFactoryDefineOptions,
> extends SettingFactoryInterfaceWithoutTraits {
  use(
    name: SettingTraitKeys<TOptions>,
    ...names: readonly SettingTraitKeys<TOptions>[]
  ): SettingFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Setting} model.
 *
 * @param options
 * @returns factory {@link SettingFactoryInterface}
 */
export declare function defineSettingFactory<
  TOptions extends SettingFactoryDefineOptions,
>(options: TOptions): SettingFactoryInterface<TOptions>;
type ChannelFactoryDefineInput = {
  id?: string;
  name?: string;
  user?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Video?: Prisma.VideoCreateNestedManyWithoutChannelInput;
};
type ChannelFactoryDefineOptions = {
  defaultData?: Resolver<ChannelFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<ChannelFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type ChannelTraitKeys<TOptions extends ChannelFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface ChannelFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Channel';
  build(
    inputData?: Partial<Prisma.ChannelCreateInput>
  ): PromiseLike<Prisma.ChannelCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.ChannelCreateInput>
  ): PromiseLike<Prisma.ChannelCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.ChannelCreateInput>[]
  ): PromiseLike<Prisma.ChannelCreateInput[]>;
  pickForConnect(inputData: Channel): Pick<Channel, 'id'>;
  create(inputData?: Partial<Prisma.ChannelCreateInput>): PromiseLike<Channel>;
  createList(
    inputData: number | readonly Partial<Prisma.ChannelCreateInput>[]
  ): PromiseLike<Channel[]>;
  createForConnect(
    inputData?: Partial<Prisma.ChannelCreateInput>
  ): PromiseLike<Pick<Channel, 'id'>>;
}
export interface ChannelFactoryInterface<
  TOptions extends ChannelFactoryDefineOptions = ChannelFactoryDefineOptions,
> extends ChannelFactoryInterfaceWithoutTraits {
  use(
    name: ChannelTraitKeys<TOptions>,
    ...names: readonly ChannelTraitKeys<TOptions>[]
  ): ChannelFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Channel} model.
 *
 * @param options
 * @returns factory {@link ChannelFactoryInterface}
 */
export declare function defineChannelFactory<
  TOptions extends ChannelFactoryDefineOptions,
>(options?: TOptions): ChannelFactoryInterface<TOptions>;
type VideochannelFactory = {
  _factoryFor: 'Channel';
  build: () => PromiseLike<
    Prisma.ChannelCreateNestedOneWithoutVideoInput['create']
  >;
};
type VideoFactoryDefineInput = {
  id?: string;
  title?: string;
  description?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  channel: VideochannelFactory | Prisma.ChannelCreateNestedOneWithoutVideoInput;
  Request?: Prisma.RequestCreateNestedManyWithoutVideoInput;
};
type VideoFactoryDefineOptions = {
  defaultData: Resolver<VideoFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<VideoFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type VideoTraitKeys<TOptions extends VideoFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface VideoFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Video';
  build(
    inputData?: Partial<Prisma.VideoCreateInput>
  ): PromiseLike<Prisma.VideoCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.VideoCreateInput>
  ): PromiseLike<Prisma.VideoCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.VideoCreateInput>[]
  ): PromiseLike<Prisma.VideoCreateInput[]>;
  pickForConnect(inputData: Video): Pick<Video, 'id'>;
  create(inputData?: Partial<Prisma.VideoCreateInput>): PromiseLike<Video>;
  createList(
    inputData: number | readonly Partial<Prisma.VideoCreateInput>[]
  ): PromiseLike<Video[]>;
  createForConnect(
    inputData?: Partial<Prisma.VideoCreateInput>
  ): PromiseLike<Pick<Video, 'id'>>;
}
export interface VideoFactoryInterface<
  TOptions extends VideoFactoryDefineOptions = VideoFactoryDefineOptions,
> extends VideoFactoryInterfaceWithoutTraits {
  use(
    name: VideoTraitKeys<TOptions>,
    ...names: readonly VideoTraitKeys<TOptions>[]
  ): VideoFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Video} model.
 *
 * @param options
 * @returns factory {@link VideoFactoryInterface}
 */
export declare function defineVideoFactory<
  TOptions extends VideoFactoryDefineOptions,
>(options: TOptions): VideoFactoryInterface<TOptions>;
type UserFactoryDefineInput = {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Request?: Prisma.RequestCreateNestedManyWithoutUserInput;
};
type UserFactoryDefineOptions = {
  defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type UserTraitKeys<TOptions extends UserFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface UserFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'User';
  build(
    inputData?: Partial<Prisma.UserCreateInput>
  ): PromiseLike<Prisma.UserCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.UserCreateInput>
  ): PromiseLike<Prisma.UserCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[]
  ): PromiseLike<Prisma.UserCreateInput[]>;
  pickForConnect(inputData: User): Pick<User, 'id'>;
  create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
  createList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[]
  ): PromiseLike<User[]>;
  createForConnect(
    inputData?: Partial<Prisma.UserCreateInput>
  ): PromiseLike<Pick<User, 'id'>>;
}
export interface UserFactoryInterface<
  TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions,
> extends UserFactoryInterfaceWithoutTraits {
  use(
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ): UserFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export declare function defineUserFactory<
  TOptions extends UserFactoryDefineOptions,
>(options?: TOptions): UserFactoryInterface<TOptions>;
type RequestguildFactory = {
  _factoryFor: 'Guild';
  build: () => PromiseLike<
    Prisma.GuildCreateNestedOneWithoutRequestInput['create']
  >;
};
type RequestuserFactory = {
  _factoryFor: 'User';
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutRequestInput['create']
  >;
};
type RequestvideoFactory = {
  _factoryFor: 'Video';
  build: () => PromiseLike<
    Prisma.VideoCreateNestedOneWithoutRequestInput['create']
  >;
};
type RequestFactoryDefineInput = {
  id?: string;
  playedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  guild: RequestguildFactory | Prisma.GuildCreateNestedOneWithoutRequestInput;
  user: RequestuserFactory | Prisma.UserCreateNestedOneWithoutRequestInput;
  video: RequestvideoFactory | Prisma.VideoCreateNestedOneWithoutRequestInput;
  Queue?: Prisma.QueueCreateNestedManyWithoutRequestInput;
};
type RequestFactoryDefineOptions = {
  defaultData: Resolver<RequestFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<RequestFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type RequestTraitKeys<TOptions extends RequestFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface RequestFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Request';
  build(
    inputData?: Partial<Prisma.RequestCreateInput>
  ): PromiseLike<Prisma.RequestCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.RequestCreateInput>
  ): PromiseLike<Prisma.RequestCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.RequestCreateInput>[]
  ): PromiseLike<Prisma.RequestCreateInput[]>;
  pickForConnect(inputData: Request): Pick<Request, 'id'>;
  create(inputData?: Partial<Prisma.RequestCreateInput>): PromiseLike<Request>;
  createList(
    inputData: number | readonly Partial<Prisma.RequestCreateInput>[]
  ): PromiseLike<Request[]>;
  createForConnect(
    inputData?: Partial<Prisma.RequestCreateInput>
  ): PromiseLike<Pick<Request, 'id'>>;
}
export interface RequestFactoryInterface<
  TOptions extends RequestFactoryDefineOptions = RequestFactoryDefineOptions,
> extends RequestFactoryInterfaceWithoutTraits {
  use(
    name: RequestTraitKeys<TOptions>,
    ...names: readonly RequestTraitKeys<TOptions>[]
  ): RequestFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Request} model.
 *
 * @param options
 * @returns factory {@link RequestFactoryInterface}
 */
export declare function defineRequestFactory<
  TOptions extends RequestFactoryDefineOptions,
>(options: TOptions): RequestFactoryInterface<TOptions>;
type QueueguildFactory = {
  _factoryFor: 'Guild';
  build: () => PromiseLike<
    Prisma.GuildCreateNestedOneWithoutQueueInput['create']
  >;
};
type QueuerequestFactory = {
  _factoryFor: 'Request';
  build: () => PromiseLike<
    Prisma.RequestCreateNestedOneWithoutQueueInput['create']
  >;
};
type QueueFactoryDefineInput = {
  id?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
  guild: QueueguildFactory | Prisma.GuildCreateNestedOneWithoutQueueInput;
  request: QueuerequestFactory | Prisma.RequestCreateNestedOneWithoutQueueInput;
};
type QueueFactoryDefineOptions = {
  defaultData: Resolver<QueueFactoryDefineInput, BuildDataOptions>;
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<QueueFactoryDefineInput>, BuildDataOptions>;
    };
  };
};
type QueueTraitKeys<TOptions extends QueueFactoryDefineOptions> =
  keyof TOptions['traits'];
export interface QueueFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Queue';
  build(
    inputData?: Partial<Prisma.QueueCreateInput>
  ): PromiseLike<Prisma.QueueCreateInput>;
  buildCreateInput(
    inputData?: Partial<Prisma.QueueCreateInput>
  ): PromiseLike<Prisma.QueueCreateInput>;
  buildList(
    inputData: number | readonly Partial<Prisma.QueueCreateInput>[]
  ): PromiseLike<Prisma.QueueCreateInput[]>;
  pickForConnect(inputData: Queue): Pick<Queue, 'id'>;
  create(inputData?: Partial<Prisma.QueueCreateInput>): PromiseLike<Queue>;
  createList(
    inputData: number | readonly Partial<Prisma.QueueCreateInput>[]
  ): PromiseLike<Queue[]>;
  createForConnect(
    inputData?: Partial<Prisma.QueueCreateInput>
  ): PromiseLike<Pick<Queue, 'id'>>;
}
export interface QueueFactoryInterface<
  TOptions extends QueueFactoryDefineOptions = QueueFactoryDefineOptions,
> extends QueueFactoryInterfaceWithoutTraits {
  use(
    name: QueueTraitKeys<TOptions>,
    ...names: readonly QueueTraitKeys<TOptions>[]
  ): QueueFactoryInterfaceWithoutTraits;
}
/**
 * Define factory for {@link Queue} model.
 *
 * @param options
 * @returns factory {@link QueueFactoryInterface}
 */
export declare function defineQueueFactory<
  TOptions extends QueueFactoryDefineOptions,
>(options: TOptions): QueueFactoryInterface<TOptions>;
