import type { Guild } from '@prisma/client';
import type { Setting } from '@prisma/client';
import type { Channel } from '@prisma/client';
import type { Video } from '@prisma/client';
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
  Setting?:
    | GuildSettingFactory
    | Prisma.SettingCreateNestedOneWithoutGuildInput;
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
  channel: VideochannelFactory | Prisma.ChannelCreateNestedOneWithoutVideoInput;
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
