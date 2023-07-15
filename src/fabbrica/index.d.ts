import type { Guild } from '@prisma/client';
import type { Setting } from '@prisma/client';
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
