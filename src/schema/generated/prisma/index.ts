import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const GuildScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'createdAt',
  'updatedAt',
]);

export const SettingScalarFieldEnumSchema = z.enum([
  'id',
  'language',
  'createdAt',
  'updatedAt',
]);

export const ChannelScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'user',
  'url',
  'createdAt',
  'updatedAt',
]);

export const VideoScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'url',
  'channelId',
  'createdAt',
  'updatedAt',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'createdAt',
  'updatedAt',
]);

export const RequestScalarFieldEnumSchema = z.enum([
  'id',
  'guildId',
  'userId',
  'videoId',
  'playedAt',
  'createdAt',
  'updatedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const LanguageSchema = z.enum(['en', 'ja']);

export type LanguageType = `${z.infer<typeof LanguageSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// GUILD SCHEMA
/////////////////////////////////////////

export const GuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Guild = z.infer<typeof GuildSchema>;

// GUILD RELATION SCHEMA
//------------------------------------------------------

export type GuildRelations = {
  Setting?: SettingWithRelations | null;
  Request: RequestWithRelations[];
};

export type GuildWithRelations = z.infer<typeof GuildSchema> & GuildRelations;

export const GuildWithRelationsSchema: z.ZodType<GuildWithRelations> =
  GuildSchema.merge(
    z.object({
      Setting: z.lazy(() => SettingWithRelationsSchema).nullable(),
      Request: z.lazy(() => RequestWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  language: LanguageSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Setting = z.infer<typeof SettingSchema>;

// SETTING RELATION SCHEMA
//------------------------------------------------------

export type SettingRelations = {
  guild: GuildWithRelations;
};

export type SettingWithRelations = z.infer<typeof SettingSchema> &
  SettingRelations;

export const SettingWithRelationsSchema: z.ZodType<SettingWithRelations> =
  SettingSchema.merge(
    z.object({
      guild: z.lazy(() => GuildWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// CHANNEL SCHEMA
/////////////////////////////////////////

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  user: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Channel = z.infer<typeof ChannelSchema>;

// CHANNEL RELATION SCHEMA
//------------------------------------------------------

export type ChannelRelations = {
  Video: VideoWithRelations[];
};

export type ChannelWithRelations = z.infer<typeof ChannelSchema> &
  ChannelRelations;

export const ChannelWithRelationsSchema: z.ZodType<ChannelWithRelations> =
  ChannelSchema.merge(
    z.object({
      Video: z.lazy(() => VideoWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// VIDEO SCHEMA
/////////////////////////////////////////

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  channelId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Video = z.infer<typeof VideoSchema>;

// VIDEO RELATION SCHEMA
//------------------------------------------------------

export type VideoRelations = {
  channel: ChannelWithRelations;
  Request: RequestWithRelations[];
};

export type VideoWithRelations = z.infer<typeof VideoSchema> & VideoRelations;

export const VideoWithRelationsSchema: z.ZodType<VideoWithRelations> =
  VideoSchema.merge(
    z.object({
      channel: z.lazy(() => ChannelWithRelationsSchema),
      Request: z.lazy(() => RequestWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  Request: RequestWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      Request: z.lazy(() => RequestWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// REQUEST SCHEMA
/////////////////////////////////////////

export const RequestSchema = z.object({
  id: z.string().uuid(),
  guildId: z.string(),
  userId: z.string(),
  videoId: z.string(),
  playedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Request = z.infer<typeof RequestSchema>;

// REQUEST RELATION SCHEMA
//------------------------------------------------------

export type RequestRelations = {
  guild: GuildWithRelations;
  user: UserWithRelations;
  video: VideoWithRelations;
};

export type RequestWithRelations = z.infer<typeof RequestSchema> &
  RequestRelations;

export const RequestWithRelationsSchema: z.ZodType<RequestWithRelations> =
  RequestSchema.merge(
    z.object({
      guild: z.lazy(() => GuildWithRelationsSchema),
      user: z.lazy(() => UserWithRelationsSchema),
      video: z.lazy(() => VideoWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// GUILD
//------------------------------------------------------

export const GuildIncludeSchema: z.ZodType<Prisma.GuildInclude> = z
  .object({
    Setting: z.union([z.boolean(), z.lazy(() => SettingArgsSchema)]).optional(),
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => GuildCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const GuildArgsSchema: z.ZodType<Prisma.GuildArgs> = z
  .object({
    select: z.lazy(() => GuildSelectSchema).optional(),
    include: z.lazy(() => GuildIncludeSchema).optional(),
  })
  .strict();

export const GuildCountOutputTypeArgsSchema: z.ZodType<Prisma.GuildCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => GuildCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const GuildCountOutputTypeSelectSchema: z.ZodType<Prisma.GuildCountOutputTypeSelect> =
  z
    .object({
      Request: z.boolean().optional(),
    })
    .strict();

export const GuildSelectSchema: z.ZodType<Prisma.GuildSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    Setting: z.union([z.boolean(), z.lazy(() => SettingArgsSchema)]).optional(),
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => GuildCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// SETTING
//------------------------------------------------------

export const SettingIncludeSchema: z.ZodType<Prisma.SettingInclude> = z
  .object({
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
  })
  .strict();

export const SettingArgsSchema: z.ZodType<Prisma.SettingArgs> = z
  .object({
    select: z.lazy(() => SettingSelectSchema).optional(),
    include: z.lazy(() => SettingIncludeSchema).optional(),
  })
  .strict();

export const SettingSelectSchema: z.ZodType<Prisma.SettingSelect> = z
  .object({
    id: z.boolean().optional(),
    language: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
  })
  .strict();

// CHANNEL
//------------------------------------------------------

export const ChannelIncludeSchema: z.ZodType<Prisma.ChannelInclude> = z
  .object({
    Video: z
      .union([z.boolean(), z.lazy(() => VideoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ChannelCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ChannelArgsSchema: z.ZodType<Prisma.ChannelArgs> = z
  .object({
    select: z.lazy(() => ChannelSelectSchema).optional(),
    include: z.lazy(() => ChannelIncludeSchema).optional(),
  })
  .strict();

export const ChannelCountOutputTypeArgsSchema: z.ZodType<Prisma.ChannelCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => ChannelCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ChannelCountOutputTypeSelectSchema: z.ZodType<Prisma.ChannelCountOutputTypeSelect> =
  z
    .object({
      Video: z.boolean().optional(),
    })
    .strict();

export const ChannelSelectSchema: z.ZodType<Prisma.ChannelSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    user: z.boolean().optional(),
    url: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    Video: z
      .union([z.boolean(), z.lazy(() => VideoFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ChannelCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// VIDEO
//------------------------------------------------------

export const VideoIncludeSchema: z.ZodType<Prisma.VideoInclude> = z
  .object({
    channel: z.union([z.boolean(), z.lazy(() => ChannelArgsSchema)]).optional(),
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VideoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const VideoArgsSchema: z.ZodType<Prisma.VideoArgs> = z
  .object({
    select: z.lazy(() => VideoSelectSchema).optional(),
    include: z.lazy(() => VideoIncludeSchema).optional(),
  })
  .strict();

export const VideoCountOutputTypeArgsSchema: z.ZodType<Prisma.VideoCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => VideoCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const VideoCountOutputTypeSelectSchema: z.ZodType<Prisma.VideoCountOutputTypeSelect> =
  z
    .object({
      Request: z.boolean().optional(),
    })
    .strict();

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    url: z.boolean().optional(),
    channelId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    channel: z.union([z.boolean(), z.lazy(() => ChannelArgsSchema)]).optional(),
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => VideoCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      Request: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    Request: z
      .union([z.boolean(), z.lazy(() => RequestFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// REQUEST
//------------------------------------------------------

export const RequestIncludeSchema: z.ZodType<Prisma.RequestInclude> = z
  .object({
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    video: z.union([z.boolean(), z.lazy(() => VideoArgsSchema)]).optional(),
  })
  .strict();

export const RequestArgsSchema: z.ZodType<Prisma.RequestArgs> = z
  .object({
    select: z.lazy(() => RequestSelectSchema).optional(),
    include: z.lazy(() => RequestIncludeSchema).optional(),
  })
  .strict();

export const RequestSelectSchema: z.ZodType<Prisma.RequestSelect> = z
  .object({
    id: z.boolean().optional(),
    guildId: z.boolean().optional(),
    userId: z.boolean().optional(),
    videoId: z.boolean().optional(),
    playedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    guild: z.union([z.boolean(), z.lazy(() => GuildArgsSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    video: z.union([z.boolean(), z.lazy(() => VideoArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const GuildWhereInputSchema: z.ZodType<Prisma.GuildWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => GuildWhereInputSchema),
        z.lazy(() => GuildWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => GuildWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => GuildWhereInputSchema),
        z.lazy(() => GuildWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    Setting: z
      .union([
        z.lazy(() => SettingNullableRelationFilterSchema),
        z.lazy(() => SettingWhereInputSchema),
      ])
      .optional()
      .nullable(),
    Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
  })
  .strict();

export const GuildOrderByWithRelationInputSchema: z.ZodType<Prisma.GuildOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      Setting: z.lazy(() => SettingOrderByWithRelationInputSchema).optional(),
      Request: z
        .lazy(() => RequestOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const GuildWhereUniqueInputSchema: z.ZodType<Prisma.GuildWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => GuildWhereInputSchema),
              z.lazy(() => GuildWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => GuildWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => GuildWhereInputSchema),
              z.lazy(() => GuildWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          Setting: z
            .union([
              z.lazy(() => SettingNullableRelationFilterSchema),
              z.lazy(() => SettingWhereInputSchema),
            ])
            .optional()
            .nullable(),
          Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const GuildOrderByWithAggregationInputSchema: z.ZodType<Prisma.GuildOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => GuildCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => GuildMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => GuildMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const GuildScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GuildScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GuildScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GuildScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GuildScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const SettingWhereInputSchema: z.ZodType<Prisma.SettingWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SettingWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SettingWhereInputSchema),
        z.lazy(() => SettingWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    language: z
      .union([
        z.lazy(() => EnumLanguageFilterSchema),
        z.lazy(() => LanguageSchema),
      ])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    guild: z
      .union([
        z.lazy(() => GuildRelationFilterSchema),
        z.lazy(() => GuildWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const SettingOrderByWithRelationInputSchema: z.ZodType<Prisma.SettingOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      guild: z.lazy(() => GuildOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const SettingWhereUniqueInputSchema: z.ZodType<Prisma.SettingWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SettingWhereInputSchema),
              z.lazy(() => SettingWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SettingWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SettingWhereInputSchema),
              z.lazy(() => SettingWhereInputSchema).array(),
            ])
            .optional(),
          language: z
            .union([
              z.lazy(() => EnumLanguageFilterSchema),
              z.lazy(() => LanguageSchema),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          guild: z
            .union([
              z.lazy(() => GuildRelationFilterSchema),
              z.lazy(() => GuildWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const SettingOrderByWithAggregationInputSchema: z.ZodType<Prisma.SettingOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SettingCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SettingMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SettingMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SettingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SettingScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SettingScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SettingScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      language: z
        .union([
          z.lazy(() => EnumLanguageWithAggregatesFilterSchema),
          z.lazy(() => LanguageSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const ChannelWhereInputSchema: z.ZodType<Prisma.ChannelWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ChannelWhereInputSchema),
        z.lazy(() => ChannelWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ChannelWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ChannelWhereInputSchema),
        z.lazy(() => ChannelWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    Video: z.lazy(() => VideoListRelationFilterSchema).optional(),
  })
  .strict();

export const ChannelOrderByWithRelationInputSchema: z.ZodType<Prisma.ChannelOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      Video: z.lazy(() => VideoOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const ChannelWhereUniqueInputSchema: z.ZodType<Prisma.ChannelWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ChannelWhereInputSchema),
              z.lazy(() => ChannelWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ChannelWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ChannelWhereInputSchema),
              z.lazy(() => ChannelWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          user: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          url: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          Video: z.lazy(() => VideoListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const ChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChannelOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ChannelCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ChannelMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ChannelMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChannelScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ChannelScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      user: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      url: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const VideoWhereInputSchema: z.ZodType<Prisma.VideoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VideoWhereInputSchema),
        z.lazy(() => VideoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VideoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VideoWhereInputSchema),
        z.lazy(() => VideoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    channelId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    channel: z
      .union([
        z.lazy(() => ChannelRelationFilterSchema),
        z.lazy(() => ChannelWhereInputSchema),
      ])
      .optional(),
    Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
  })
  .strict();

export const VideoOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      channelId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      channel: z.lazy(() => ChannelOrderByWithRelationInputSchema).optional(),
      Request: z
        .lazy(() => RequestOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const VideoWhereUniqueInputSchema: z.ZodType<Prisma.VideoWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => VideoWhereInputSchema),
              z.lazy(() => VideoWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => VideoWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VideoWhereInputSchema),
              z.lazy(() => VideoWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          url: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          channelId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          channel: z
            .union([
              z.lazy(() => ChannelRelationFilterSchema),
              z.lazy(() => ChannelWhereInputSchema),
            ])
            .optional(),
          Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const VideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      channelId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => VideoCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => VideoMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => VideoMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const VideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      url: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      channelId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      Request: z
        .lazy(() => RequestOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          Request: z.lazy(() => RequestListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const RequestWhereInputSchema: z.ZodType<Prisma.RequestWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RequestWhereInputSchema),
        z.lazy(() => RequestWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RequestWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RequestWhereInputSchema),
        z.lazy(() => RequestWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    guildId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    videoId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    playedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    guild: z
      .union([
        z.lazy(() => GuildRelationFilterSchema),
        z.lazy(() => GuildWhereInputSchema),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    video: z
      .union([
        z.lazy(() => VideoRelationFilterSchema),
        z.lazy(() => VideoWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const RequestOrderByWithRelationInputSchema: z.ZodType<Prisma.RequestOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      guildId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      videoId: z.lazy(() => SortOrderSchema).optional(),
      playedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      guild: z.lazy(() => GuildOrderByWithRelationInputSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      video: z.lazy(() => VideoOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const RequestWhereUniqueInputSchema: z.ZodType<Prisma.RequestWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid(),
    })
    .and(
      z
        .object({
          id: z.string().uuid().optional(),
          AND: z
            .union([
              z.lazy(() => RequestWhereInputSchema),
              z.lazy(() => RequestWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RequestWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RequestWhereInputSchema),
              z.lazy(() => RequestWhereInputSchema).array(),
            ])
            .optional(),
          guildId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          videoId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          playedAt: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          guild: z
            .union([
              z.lazy(() => GuildRelationFilterSchema),
              z.lazy(() => GuildWhereInputSchema),
            ])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          video: z
            .union([
              z.lazy(() => VideoRelationFilterSchema),
              z.lazy(() => VideoWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const RequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.RequestOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      guildId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      videoId: z.lazy(() => SortOrderSchema).optional(),
      playedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => RequestCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => RequestMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => RequestMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const RequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RequestScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RequestScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RequestScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RequestScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RequestScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RequestScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      guildId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      videoId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      playedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const GuildCreateInputSchema: z.ZodType<Prisma.GuildCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Setting: z
      .lazy(() => SettingCreateNestedOneWithoutGuildInputSchema)
      .optional(),
    Request: z
      .lazy(() => RequestCreateNestedManyWithoutGuildInputSchema)
      .optional(),
  })
  .strict();

export const GuildUncheckedCreateInputSchema: z.ZodType<Prisma.GuildUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Setting: z
        .lazy(() => SettingUncheckedCreateNestedOneWithoutGuildInputSchema)
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedCreateNestedManyWithoutGuildInputSchema)
        .optional(),
    })
    .strict();

export const GuildUpdateInputSchema: z.ZodType<Prisma.GuildUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Setting: z
      .lazy(() => SettingUpdateOneWithoutGuildNestedInputSchema)
      .optional(),
    Request: z
      .lazy(() => RequestUpdateManyWithoutGuildNestedInputSchema)
      .optional(),
  })
  .strict();

export const GuildUncheckedUpdateInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Setting: z
        .lazy(() => SettingUncheckedUpdateOneWithoutGuildNestedInputSchema)
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedUpdateManyWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const GuildCreateManyInputSchema: z.ZodType<Prisma.GuildCreateManyInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GuildUpdateManyMutationInputSchema: z.ZodType<Prisma.GuildUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GuildUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z
  .object({
    language: z.lazy(() => LanguageSchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    guild: z.lazy(() => GuildCreateNestedOneWithoutSettingInputSchema),
  })
  .strict();

export const SettingUncheckedCreateInputSchema: z.ZodType<Prisma.SettingUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      language: z.lazy(() => LanguageSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SettingUpdateInputSchema: z.ZodType<Prisma.SettingUpdateInput> = z
  .object({
    language: z
      .union([
        z.lazy(() => LanguageSchema),
        z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    guild: z
      .lazy(() => GuildUpdateOneRequiredWithoutSettingNestedInputSchema)
      .optional(),
  })
  .strict();

export const SettingUncheckedUpdateInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      language: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SettingCreateManyInputSchema: z.ZodType<Prisma.SettingCreateManyInput> =
  z
    .object({
      id: z.string(),
      language: z.lazy(() => LanguageSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SettingUpdateManyMutationInputSchema: z.ZodType<Prisma.SettingUpdateManyMutationInput> =
  z
    .object({
      language: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SettingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      language: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChannelCreateInputSchema: z.ZodType<Prisma.ChannelCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    user: z.string(),
    url: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Video: z
      .lazy(() => VideoCreateNestedManyWithoutChannelInputSchema)
      .optional(),
  })
  .strict();

export const ChannelUncheckedCreateInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Video: z
        .lazy(() => VideoUncheckedCreateNestedManyWithoutChannelInputSchema)
        .optional(),
    })
    .strict();

export const ChannelUpdateInputSchema: z.ZodType<Prisma.ChannelUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    user: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    url: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Video: z
      .lazy(() => VideoUpdateManyWithoutChannelNestedInputSchema)
      .optional(),
  })
  .strict();

export const ChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Video: z
        .lazy(() => VideoUncheckedUpdateManyWithoutChannelNestedInputSchema)
        .optional(),
    })
    .strict();

export const ChannelCreateManyInputSchema: z.ZodType<Prisma.ChannelCreateManyInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.ChannelUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    channel: z.lazy(() => ChannelCreateNestedOneWithoutVideoInputSchema),
    Request: z
      .lazy(() => RequestCreateNestedManyWithoutVideoInputSchema)
      .optional(),
  })
  .strict();

export const VideoUncheckedCreateInputSchema: z.ZodType<Prisma.VideoUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      channelId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestUncheckedCreateNestedManyWithoutVideoInputSchema)
        .optional(),
    })
    .strict();

export const VideoUpdateInputSchema: z.ZodType<Prisma.VideoUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    url: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    channel: z
      .lazy(() => ChannelUpdateOneRequiredWithoutVideoNestedInputSchema)
      .optional(),
    Request: z
      .lazy(() => RequestUpdateManyWithoutVideoNestedInputSchema)
      .optional(),
  })
  .strict();

export const VideoUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      channelId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedUpdateManyWithoutVideoNestedInputSchema)
        .optional(),
    })
    .strict();

export const VideoCreateManyInputSchema: z.ZodType<Prisma.VideoCreateManyInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      channelId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      channelId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Request: z
      .lazy(() => RequestCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Request: z
      .lazy(() => RequestUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateInputSchema: z.ZodType<Prisma.RequestCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    playedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    guild: z.lazy(() => GuildCreateNestedOneWithoutRequestInputSchema),
    user: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
    video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
  })
  .strict();

export const RequestUncheckedCreateInputSchema: z.ZodType<Prisma.RequestUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      userId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestUpdateInputSchema: z.ZodType<Prisma.RequestUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().uuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    playedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    guild: z
      .lazy(() => GuildUpdateOneRequiredWithoutRequestNestedInputSchema)
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema)
      .optional(),
    video: z
      .lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema)
      .optional(),
  })
  .strict();

export const RequestUncheckedUpdateInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateManyInputSchema: z.ZodType<Prisma.RequestCreateManyInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      userId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestUpdateManyMutationInputSchema: z.ZodType<Prisma.RequestUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    in: z
      .union([z.string().array(), z.lazy(() => ListStringFieldRefInputSchema)])
      .optional(),
    notIn: z
      .union([z.string().array(), z.lazy(() => ListStringFieldRefInputSchema)])
      .optional(),
    lt: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    lte: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    gt: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    gte: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    contains: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    startsWith: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    endsWith: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
      .optional(),
    in: z
      .union([
        z.coerce.date().array(),
        z.lazy(() => ListDateTimeFieldRefInputSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.coerce.date().array(),
        z.lazy(() => ListDateTimeFieldRefInputSchema),
      ])
      .optional(),
    lt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
      .optional(),
    lte: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
      .optional(),
    gt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
      .optional(),
    gte: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
      .optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const SettingNullableRelationFilterSchema: z.ZodType<Prisma.SettingNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => SettingWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => SettingWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const RequestListRelationFilterSchema: z.ZodType<Prisma.RequestListRelationFilter> =
  z
    .object({
      every: z.lazy(() => RequestWhereInputSchema).optional(),
      some: z.lazy(() => RequestWhereInputSchema).optional(),
      none: z.lazy(() => RequestWhereInputSchema).optional(),
    })
    .strict();

export const RequestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RequestOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuildCountOrderByAggregateInputSchema: z.ZodType<Prisma.GuildCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuildMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuildMinOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      in: z
        .union([
          z.string().array(),
          z.lazy(() => ListStringFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.string().array(),
          z.lazy(() => ListStringFieldRefInputSchema),
        ])
        .optional(),
      lt: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      contains: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      startsWith: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      endsWith: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const EnumLanguageFilterSchema: z.ZodType<Prisma.EnumLanguageFilter> = z
  .object({
    equals: z
      .union([
        z.lazy(() => LanguageSchema),
        z.lazy(() => EnumLanguageFieldRefInputSchema),
      ])
      .optional(),
    in: z
      .union([
        z.lazy(() => LanguageSchema).array(),
        z.lazy(() => ListEnumLanguageFieldRefInputSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => LanguageSchema).array(),
        z.lazy(() => ListEnumLanguageFieldRefInputSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => LanguageSchema),
        z.lazy(() => NestedEnumLanguageFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const GuildRelationFilterSchema: z.ZodType<Prisma.GuildRelationFilter> =
  z
    .object({
      is: z.lazy(() => GuildWhereInputSchema).optional(),
      isNot: z.lazy(() => GuildWhereInputSchema).optional(),
    })
    .strict();

export const SettingCountOrderByAggregateInputSchema: z.ZodType<Prisma.SettingCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingMinOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLanguageWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      in: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      not: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
    })
    .strict();

export const VideoListRelationFilterSchema: z.ZodType<Prisma.VideoListRelationFilter> =
  z
    .object({
      every: z.lazy(() => VideoWhereInputSchema).optional(),
      some: z.lazy(() => VideoWhereInputSchema).optional(),
      none: z.lazy(() => VideoWhereInputSchema).optional(),
    })
    .strict();

export const VideoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VideoOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChannelRelationFilterSchema: z.ZodType<Prisma.ChannelRelationFilter> =
  z
    .object({
      is: z.lazy(() => ChannelWhereInputSchema).optional(),
      isNot: z.lazy(() => ChannelWhereInputSchema).optional(),
    })
    .strict();

export const VideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      channelId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      channelId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      channelId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional()
        .nullable(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const VideoRelationFilterSchema: z.ZodType<Prisma.VideoRelationFilter> =
  z
    .object({
      is: z.lazy(() => VideoWhereInputSchema).optional(),
      isNot: z.lazy(() => VideoWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const RequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.RequestCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      guildId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      videoId: z.lazy(() => SortOrderSchema).optional(),
      playedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RequestMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      guildId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      videoId: z.lazy(() => SortOrderSchema).optional(),
      playedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.RequestMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      guildId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      videoId: z.lazy(() => SortOrderSchema).optional(),
      playedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional()
        .nullable(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const SettingCreateNestedOneWithoutGuildInputSchema: z.ZodType<Prisma.SettingCreateNestedOneWithoutGuildInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingCreateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SettingCreateOrConnectWithoutGuildInputSchema)
        .optional(),
      connect: z.lazy(() => SettingWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RequestCreateNestedManyWithoutGuildInputSchema: z.ZodType<Prisma.RequestCreateNestedManyWithoutGuildInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutGuildInputSchema),
          z.lazy(() => RequestCreateWithoutGuildInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyGuildInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SettingUncheckedCreateNestedOneWithoutGuildInputSchema: z.ZodType<Prisma.SettingUncheckedCreateNestedOneWithoutGuildInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingCreateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SettingCreateOrConnectWithoutGuildInputSchema)
        .optional(),
      connect: z.lazy(() => SettingWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RequestUncheckedCreateNestedManyWithoutGuildInputSchema: z.ZodType<Prisma.RequestUncheckedCreateNestedManyWithoutGuildInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutGuildInputSchema),
          z.lazy(() => RequestCreateWithoutGuildInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyGuildInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const SettingUpdateOneWithoutGuildNestedInputSchema: z.ZodType<Prisma.SettingUpdateOneWithoutGuildNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingCreateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SettingCreateOrConnectWithoutGuildInputSchema)
        .optional(),
      upsert: z.lazy(() => SettingUpsertWithoutGuildInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => SettingWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => SettingWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => SettingWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => SettingUpdateToOneWithWhereWithoutGuildInputSchema),
          z.lazy(() => SettingUpdateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedUpdateWithoutGuildInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUpdateManyWithoutGuildNestedInputSchema: z.ZodType<Prisma.RequestUpdateManyWithoutGuildNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutGuildInputSchema),
          z.lazy(() => RequestCreateWithoutGuildInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyGuildInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SettingUncheckedUpdateOneWithoutGuildNestedInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateOneWithoutGuildNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SettingCreateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SettingCreateOrConnectWithoutGuildInputSchema)
        .optional(),
      upsert: z.lazy(() => SettingUpsertWithoutGuildInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => SettingWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => SettingWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => SettingWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => SettingUpdateToOneWithWhereWithoutGuildInputSchema),
          z.lazy(() => SettingUpdateWithoutGuildInputSchema),
          z.lazy(() => SettingUncheckedUpdateWithoutGuildInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutGuildNestedInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutGuildNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutGuildInputSchema),
          z.lazy(() => RequestCreateWithoutGuildInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutGuildInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyGuildInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutGuildInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutGuildInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuildCreateNestedOneWithoutSettingInputSchema: z.ZodType<Prisma.GuildCreateNestedOneWithoutSettingInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuildCreateWithoutSettingInputSchema),
          z.lazy(() => GuildUncheckedCreateWithoutSettingInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GuildCreateOrConnectWithoutSettingInputSchema)
        .optional(),
      connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumLanguageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLanguageFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => LanguageSchema).optional(),
    })
    .strict();

export const GuildUpdateOneRequiredWithoutSettingNestedInputSchema: z.ZodType<Prisma.GuildUpdateOneRequiredWithoutSettingNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuildCreateWithoutSettingInputSchema),
          z.lazy(() => GuildUncheckedCreateWithoutSettingInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GuildCreateOrConnectWithoutSettingInputSchema)
        .optional(),
      upsert: z.lazy(() => GuildUpsertWithoutSettingInputSchema).optional(),
      connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => GuildUpdateToOneWithWhereWithoutSettingInputSchema),
          z.lazy(() => GuildUpdateWithoutSettingInputSchema),
          z.lazy(() => GuildUncheckedUpdateWithoutSettingInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateNestedManyWithoutChannelInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutChannelInputSchema),
          z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoCreateManyChannelInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const VideoUncheckedCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutChannelInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutChannelInputSchema),
          z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoCreateManyChannelInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const VideoUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.VideoUpdateManyWithoutChannelNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutChannelInputSchema),
          z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoCreateManyChannelInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => VideoScalarWhereInputSchema),
          z.lazy(() => VideoScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const VideoUncheckedUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutChannelNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutChannelInputSchema),
          z.lazy(() => VideoCreateWithoutChannelInputSchema).array(),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema),
          z.lazy(() => VideoCreateOrConnectWithoutChannelInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpsertWithWhereUniqueWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoCreateManyChannelInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoWhereUniqueInputSchema),
          z.lazy(() => VideoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpdateWithWhereUniqueWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema),
          z
            .lazy(() => VideoUpdateManyWithWhereWithoutChannelInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => VideoScalarWhereInputSchema),
          z.lazy(() => VideoScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelCreateNestedOneWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateNestedOneWithoutVideoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChannelCreateWithoutVideoInputSchema),
          z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ChannelCreateOrConnectWithoutVideoInputSchema)
        .optional(),
      connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RequestCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateNestedManyWithoutVideoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutVideoInputSchema),
          z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyVideoInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedCreateNestedManyWithoutVideoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutVideoInputSchema),
          z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyVideoInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelUpdateOneRequiredWithoutVideoNestedInputSchema: z.ZodType<Prisma.ChannelUpdateOneRequiredWithoutVideoNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChannelCreateWithoutVideoInputSchema),
          z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ChannelCreateOrConnectWithoutVideoInputSchema)
        .optional(),
      upsert: z.lazy(() => ChannelUpsertWithoutVideoInputSchema).optional(),
      connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ChannelUpdateToOneWithWhereWithoutVideoInputSchema),
          z.lazy(() => ChannelUpdateWithoutVideoInputSchema),
          z.lazy(() => ChannelUncheckedUpdateWithoutVideoInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.RequestUpdateManyWithoutVideoNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutVideoInputSchema),
          z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyVideoInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutVideoNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutVideoInputSchema),
          z.lazy(() => RequestCreateWithoutVideoInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutVideoInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyVideoInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutVideoInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RequestCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutUserInputSchema),
          z.lazy(() => RequestCreateWithoutUserInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RequestUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutUserInputSchema),
          z.lazy(() => RequestCreateWithoutUserInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RequestUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutUserInputSchema),
          z.lazy(() => RequestCreateWithoutUserInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RequestCreateWithoutUserInputSchema),
          z.lazy(() => RequestCreateWithoutUserInputSchema).array(),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => RequestCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RequestUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => RequestUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RequestCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RequestWhereUniqueInputSchema),
          z.lazy(() => RequestWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RequestUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => RequestUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RequestUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => RequestUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const GuildCreateNestedOneWithoutRequestInputSchema: z.ZodType<Prisma.GuildCreateNestedOneWithoutRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuildCreateWithoutRequestInputSchema),
          z.lazy(() => GuildUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GuildCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRequestInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const VideoCreateNestedOneWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateNestedOneWithoutRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutRequestInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VideoCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      connect: z.lazy(() => VideoWhereUniqueInputSchema).optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const GuildUpdateOneRequiredWithoutRequestNestedInputSchema: z.ZodType<Prisma.GuildUpdateOneRequiredWithoutRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GuildCreateWithoutRequestInputSchema),
          z.lazy(() => GuildUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => GuildCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      upsert: z.lazy(() => GuildUpsertWithoutRequestInputSchema).optional(),
      connect: z.lazy(() => GuildWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => GuildUpdateToOneWithWhereWithoutRequestInputSchema),
          z.lazy(() => GuildUpdateWithoutRequestInputSchema),
          z.lazy(() => GuildUncheckedUpdateWithoutRequestInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutRequestNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRequestInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutRequestInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutRequestInputSchema),
          z.lazy(() => UserUpdateWithoutRequestInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutRequestInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoUpdateOneRequiredWithoutRequestNestedInputSchema: z.ZodType<Prisma.VideoUpdateOneRequiredWithoutRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoCreateWithoutRequestInputSchema),
          z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VideoCreateOrConnectWithoutRequestInputSchema)
        .optional(),
      upsert: z.lazy(() => VideoUpsertWithoutRequestInputSchema).optional(),
      connect: z.lazy(() => VideoWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => VideoUpdateToOneWithWhereWithoutRequestInputSchema),
          z.lazy(() => VideoUpdateWithoutRequestInputSchema),
          z.lazy(() => VideoUncheckedUpdateWithoutRequestInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    in: z
      .union([z.string().array(), z.lazy(() => ListStringFieldRefInputSchema)])
      .optional(),
    notIn: z
      .union([z.string().array(), z.lazy(() => ListStringFieldRefInputSchema)])
      .optional(),
    lt: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    lte: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    gt: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    gte: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    contains: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    startsWith: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    endsWith: z
      .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
      .optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      in: z
        .union([
          z.string().array(),
          z.lazy(() => ListStringFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.string().array(),
          z.lazy(() => ListStringFieldRefInputSchema),
        ])
        .optional(),
      lt: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      contains: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      startsWith: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      endsWith: z
        .union([z.string(), z.lazy(() => StringFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z
      .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
      .optional(),
    in: z
      .union([z.number().array(), z.lazy(() => ListIntFieldRefInputSchema)])
      .optional(),
    notIn: z
      .union([z.number().array(), z.lazy(() => ListIntFieldRefInputSchema)])
      .optional(),
    lt: z.union([z.number(), z.lazy(() => IntFieldRefInputSchema)]).optional(),
    lte: z.union([z.number(), z.lazy(() => IntFieldRefInputSchema)]).optional(),
    gt: z.union([z.number(), z.lazy(() => IntFieldRefInputSchema)]).optional(),
    gte: z.union([z.number(), z.lazy(() => IntFieldRefInputSchema)]).optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumLanguageFilterSchema: z.ZodType<Prisma.NestedEnumLanguageFilter> =
  z
    .object({
      equals: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      in: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      not: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => NestedEnumLanguageFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLanguageWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      in: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.lazy(() => LanguageSchema).array(),
          z.lazy(() => ListEnumLanguageFieldRefInputSchema),
        ])
        .optional(),
      not: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional()
        .nullable(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional()
        .nullable(),
      in: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.coerce.date().array(),
          z.lazy(() => ListDateTimeFieldRefInputSchema),
        ])
        .optional()
        .nullable(),
      lt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldRefInputSchema)])
        .optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z
        .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
        .optional()
        .nullable(),
      in: z
        .union([z.number().array(), z.lazy(() => ListIntFieldRefInputSchema)])
        .optional()
        .nullable(),
      notIn: z
        .union([z.number().array(), z.lazy(() => ListIntFieldRefInputSchema)])
        .optional()
        .nullable(),
      lt: z
        .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
        .optional(),
      lte: z
        .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
        .optional(),
      gt: z
        .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
        .optional(),
      gte: z
        .union([z.number(), z.lazy(() => IntFieldRefInputSchema)])
        .optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SettingCreateWithoutGuildInputSchema: z.ZodType<Prisma.SettingCreateWithoutGuildInput> =
  z
    .object({
      language: z.lazy(() => LanguageSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SettingUncheckedCreateWithoutGuildInputSchema: z.ZodType<Prisma.SettingUncheckedCreateWithoutGuildInput> =
  z
    .object({
      language: z.lazy(() => LanguageSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SettingCreateOrConnectWithoutGuildInputSchema: z.ZodType<Prisma.SettingCreateOrConnectWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => SettingWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SettingCreateWithoutGuildInputSchema),
        z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const RequestCreateWithoutGuildInputSchema: z.ZodType<Prisma.RequestCreateWithoutGuildInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
      video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
    })
    .strict();

export const RequestUncheckedCreateWithoutGuildInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutGuildInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      userId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestCreateOrConnectWithoutGuildInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RequestCreateWithoutGuildInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const RequestCreateManyGuildInputEnvelopeSchema: z.ZodType<Prisma.RequestCreateManyGuildInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RequestCreateManyGuildInputSchema),
        z.lazy(() => RequestCreateManyGuildInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SettingUpsertWithoutGuildInputSchema: z.ZodType<Prisma.SettingUpsertWithoutGuildInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => SettingUpdateWithoutGuildInputSchema),
        z.lazy(() => SettingUncheckedUpdateWithoutGuildInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SettingCreateWithoutGuildInputSchema),
        z.lazy(() => SettingUncheckedCreateWithoutGuildInputSchema),
      ]),
      where: z.lazy(() => SettingWhereInputSchema).optional(),
    })
    .strict();

export const SettingUpdateToOneWithWhereWithoutGuildInputSchema: z.ZodType<Prisma.SettingUpdateToOneWithWhereWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => SettingWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => SettingUpdateWithoutGuildInputSchema),
        z.lazy(() => SettingUncheckedUpdateWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const SettingUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SettingUpdateWithoutGuildInput> =
  z
    .object({
      language: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SettingUncheckedUpdateWithoutGuildInputSchema: z.ZodType<Prisma.SettingUncheckedUpdateWithoutGuildInput> =
  z
    .object({
      language: z
        .union([
          z.lazy(() => LanguageSchema),
          z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUpsertWithWhereUniqueWithoutGuildInputSchema: z.ZodType<Prisma.RequestUpsertWithWhereUniqueWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RequestUpdateWithoutGuildInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutGuildInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RequestCreateWithoutGuildInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateWithWhereUniqueWithoutGuildInputSchema: z.ZodType<Prisma.RequestUpdateWithWhereUniqueWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateWithoutGuildInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateManyWithWhereWithoutGuildInputSchema: z.ZodType<Prisma.RequestUpdateManyWithWhereWithoutGuildInput> =
  z
    .object({
      where: z.lazy(() => RequestScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateManyMutationInputSchema),
        z.lazy(() => RequestUncheckedUpdateManyWithoutGuildInputSchema),
      ]),
    })
    .strict();

export const RequestScalarWhereInputSchema: z.ZodType<Prisma.RequestScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RequestScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RequestScalarWhereInputSchema),
          z.lazy(() => RequestScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      guildId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      videoId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      playedAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const GuildCreateWithoutSettingInputSchema: z.ZodType<Prisma.GuildCreateWithoutSettingInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestCreateNestedManyWithoutGuildInputSchema)
        .optional(),
    })
    .strict();

export const GuildUncheckedCreateWithoutSettingInputSchema: z.ZodType<Prisma.GuildUncheckedCreateWithoutSettingInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestUncheckedCreateNestedManyWithoutGuildInputSchema)
        .optional(),
    })
    .strict();

export const GuildCreateOrConnectWithoutSettingInputSchema: z.ZodType<Prisma.GuildCreateOrConnectWithoutSettingInput> =
  z
    .object({
      where: z.lazy(() => GuildWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GuildCreateWithoutSettingInputSchema),
        z.lazy(() => GuildUncheckedCreateWithoutSettingInputSchema),
      ]),
    })
    .strict();

export const GuildUpsertWithoutSettingInputSchema: z.ZodType<Prisma.GuildUpsertWithoutSettingInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GuildUpdateWithoutSettingInputSchema),
        z.lazy(() => GuildUncheckedUpdateWithoutSettingInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GuildCreateWithoutSettingInputSchema),
        z.lazy(() => GuildUncheckedCreateWithoutSettingInputSchema),
      ]),
      where: z.lazy(() => GuildWhereInputSchema).optional(),
    })
    .strict();

export const GuildUpdateToOneWithWhereWithoutSettingInputSchema: z.ZodType<Prisma.GuildUpdateToOneWithWhereWithoutSettingInput> =
  z
    .object({
      where: z.lazy(() => GuildWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GuildUpdateWithoutSettingInputSchema),
        z.lazy(() => GuildUncheckedUpdateWithoutSettingInputSchema),
      ]),
    })
    .strict();

export const GuildUpdateWithoutSettingInputSchema: z.ZodType<Prisma.GuildUpdateWithoutSettingInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUpdateManyWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const GuildUncheckedUpdateWithoutSettingInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateWithoutSettingInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedUpdateManyWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const VideoCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateWithoutChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestCreateNestedManyWithoutVideoInputSchema)
        .optional(),
    })
    .strict();

export const VideoUncheckedCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Request: z
        .lazy(() => RequestUncheckedCreateNestedManyWithoutVideoInputSchema)
        .optional(),
    })
    .strict();

export const VideoCreateOrConnectWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => VideoCreateWithoutChannelInputSchema),
        z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
      ]),
    })
    .strict();

export const VideoCreateManyChannelInputEnvelopeSchema: z.ZodType<Prisma.VideoCreateManyChannelInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => VideoCreateManyChannelInputSchema),
        z.lazy(() => VideoCreateManyChannelInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VideoUpsertWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => VideoUpdateWithoutChannelInputSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutChannelInputSchema),
      ]),
      create: z.union([
        z.lazy(() => VideoCreateWithoutChannelInputSchema),
        z.lazy(() => VideoUncheckedCreateWithoutChannelInputSchema),
      ]),
    })
    .strict();

export const VideoUpdateWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => VideoUpdateWithoutChannelInputSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutChannelInputSchema),
      ]),
    })
    .strict();

export const VideoUpdateManyWithWhereWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutChannelInput> =
  z
    .object({
      where: z.lazy(() => VideoScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => VideoUpdateManyMutationInputSchema),
        z.lazy(() => VideoUncheckedUpdateManyWithoutChannelInputSchema),
      ]),
    })
    .strict();

export const VideoScalarWhereInputSchema: z.ZodType<Prisma.VideoScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoScalarWhereInputSchema),
          z.lazy(() => VideoScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoScalarWhereInputSchema),
          z.lazy(() => VideoScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      channelId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const ChannelCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateWithoutVideoInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ChannelUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutVideoInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ChannelCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ChannelCreateWithoutVideoInputSchema),
        z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const RequestCreateWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateWithoutVideoInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      guild: z.lazy(() => GuildCreateNestedOneWithoutRequestInputSchema),
      user: z.lazy(() => UserCreateNestedOneWithoutRequestInputSchema),
    })
    .strict();

export const RequestUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutVideoInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      userId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RequestCreateWithoutVideoInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const RequestCreateManyVideoInputEnvelopeSchema: z.ZodType<Prisma.RequestCreateManyVideoInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RequestCreateManyVideoInputSchema),
        z.lazy(() => RequestCreateManyVideoInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ChannelUpsertWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUpsertWithoutVideoInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ChannelUpdateWithoutVideoInputSchema),
        z.lazy(() => ChannelUncheckedUpdateWithoutVideoInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ChannelCreateWithoutVideoInputSchema),
        z.lazy(() => ChannelUncheckedCreateWithoutVideoInputSchema),
      ]),
      where: z.lazy(() => ChannelWhereInputSchema).optional(),
    })
    .strict();

export const ChannelUpdateToOneWithWhereWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUpdateToOneWithWhereWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ChannelUpdateWithoutVideoInputSchema),
        z.lazy(() => ChannelUncheckedUpdateWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const ChannelUpdateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUpdateWithoutVideoInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ChannelUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateWithoutVideoInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUpsertWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpsertWithWhereUniqueWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RequestUpdateWithoutVideoInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutVideoInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RequestCreateWithoutVideoInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateWithWhereUniqueWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateWithoutVideoInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateManyWithWhereWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateManyWithWhereWithoutVideoInput> =
  z
    .object({
      where: z.lazy(() => RequestScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateManyMutationInputSchema),
        z.lazy(() => RequestUncheckedUpdateManyWithoutVideoInputSchema),
      ]),
    })
    .strict();

export const RequestCreateWithoutUserInputSchema: z.ZodType<Prisma.RequestCreateWithoutUserInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      guild: z.lazy(() => GuildCreateNestedOneWithoutRequestInputSchema),
      video: z.lazy(() => VideoCreateNestedOneWithoutRequestInputSchema),
    })
    .strict();

export const RequestUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RequestUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RequestCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RequestCreateWithoutUserInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const RequestCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RequestCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RequestCreateManyUserInputSchema),
        z.lazy(() => RequestCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RequestUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RequestUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RequestUpdateWithoutUserInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RequestCreateWithoutUserInputSchema),
        z.lazy(() => RequestUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RequestUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => RequestWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateWithoutUserInputSchema),
        z.lazy(() => RequestUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const RequestUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RequestUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => RequestScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RequestUpdateManyMutationInputSchema),
        z.lazy(() => RequestUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const GuildCreateWithoutRequestInputSchema: z.ZodType<Prisma.GuildCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Setting: z
        .lazy(() => SettingCreateNestedOneWithoutGuildInputSchema)
        .optional(),
    })
    .strict();

export const GuildUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.GuildUncheckedCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Setting: z
        .lazy(() => SettingUncheckedCreateNestedOneWithoutGuildInputSchema)
        .optional(),
    })
    .strict();

export const GuildCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.GuildCreateOrConnectWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => GuildWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GuildCreateWithoutRequestInputSchema),
        z.lazy(() => GuildUncheckedCreateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutRequestInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const VideoCreateWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      channel: z.lazy(() => ChannelCreateNestedOneWithoutVideoInputSchema),
    })
    .strict();

export const VideoUncheckedCreateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutRequestInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      channelId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoCreateOrConnectWithoutRequestInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => VideoCreateWithoutRequestInputSchema),
        z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const GuildUpsertWithoutRequestInputSchema: z.ZodType<Prisma.GuildUpsertWithoutRequestInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GuildUpdateWithoutRequestInputSchema),
        z.lazy(() => GuildUncheckedUpdateWithoutRequestInputSchema),
      ]),
      create: z.union([
        z.lazy(() => GuildCreateWithoutRequestInputSchema),
        z.lazy(() => GuildUncheckedCreateWithoutRequestInputSchema),
      ]),
      where: z.lazy(() => GuildWhereInputSchema).optional(),
    })
    .strict();

export const GuildUpdateToOneWithWhereWithoutRequestInputSchema: z.ZodType<Prisma.GuildUpdateToOneWithWhereWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => GuildWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GuildUpdateWithoutRequestInputSchema),
        z.lazy(() => GuildUncheckedUpdateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const GuildUpdateWithoutRequestInputSchema: z.ZodType<Prisma.GuildUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Setting: z
        .lazy(() => SettingUpdateOneWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const GuildUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.GuildUncheckedUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Setting: z
        .lazy(() => SettingUncheckedUpdateOneWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUpsertWithoutRequestInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutRequestInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRequestInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutRequestInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutRequestInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutRequestInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutRequestInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutRequestInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoUpsertWithoutRequestInputSchema: z.ZodType<Prisma.VideoUpsertWithoutRequestInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => VideoUpdateWithoutRequestInputSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutRequestInputSchema),
      ]),
      create: z.union([
        z.lazy(() => VideoCreateWithoutRequestInputSchema),
        z.lazy(() => VideoUncheckedCreateWithoutRequestInputSchema),
      ]),
      where: z.lazy(() => VideoWhereInputSchema).optional(),
    })
    .strict();

export const VideoUpdateToOneWithWhereWithoutRequestInputSchema: z.ZodType<Prisma.VideoUpdateToOneWithWhereWithoutRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => VideoUpdateWithoutRequestInputSchema),
        z.lazy(() => VideoUncheckedUpdateWithoutRequestInputSchema),
      ]),
    })
    .strict();

export const VideoUpdateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      channel: z
        .lazy(() => ChannelUpdateOneRequiredWithoutVideoNestedInputSchema)
        .optional(),
    })
    .strict();

export const VideoUncheckedUpdateWithoutRequestInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      channelId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateManyGuildInputSchema: z.ZodType<Prisma.RequestCreateManyGuildInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      userId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestUpdateWithoutGuildInputSchema: z.ZodType<Prisma.RequestUpdateWithoutGuildInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
      video: z
        .lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateWithoutGuildInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutGuildInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutGuildInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutGuildInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoCreateManyChannelInputSchema: z.ZodType<Prisma.VideoCreateManyChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoUpdateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUpdateWithoutChannelInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUpdateManyWithoutVideoNestedInputSchema)
        .optional(),
    })
    .strict();

export const VideoUncheckedUpdateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutChannelInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Request: z
        .lazy(() => RequestUncheckedUpdateManyWithoutVideoNestedInputSchema)
        .optional(),
    })
    .strict();

export const VideoUncheckedUpdateManyWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutChannelInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateManyVideoInputSchema: z.ZodType<Prisma.RequestCreateManyVideoInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      userId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestUpdateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUpdateWithoutVideoInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guild: z
        .lazy(() => GuildUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutVideoInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutVideoInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutVideoInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestCreateManyUserInputSchema: z.ZodType<Prisma.RequestCreateManyUserInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      guildId: z.string(),
      videoId: z.string(),
      playedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const RequestUpdateWithoutUserInputSchema: z.ZodType<Prisma.RequestUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guild: z
        .lazy(() => GuildUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
      video: z
        .lazy(() => VideoUpdateOneRequiredWithoutRequestNestedInputSchema)
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RequestUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RequestUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      guildId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      playedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const GuildFindFirstArgsSchema: z.ZodType<Prisma.GuildFindFirstArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereInputSchema.optional(),
    orderBy: z
      .union([
        GuildOrderByWithRelationInputSchema.array(),
        GuildOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const GuildFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GuildFindFirstOrThrowArgs> =
  z
    .object({
      select: GuildSelectSchema.optional(),
      include: GuildIncludeSchema.optional(),
      where: GuildWhereInputSchema.optional(),
      orderBy: z
        .union([
          GuildOrderByWithRelationInputSchema.array(),
          GuildOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GuildWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const GuildFindManyArgsSchema: z.ZodType<Prisma.GuildFindManyArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereInputSchema.optional(),
    orderBy: z
      .union([
        GuildOrderByWithRelationInputSchema.array(),
        GuildOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([GuildScalarFieldEnumSchema, GuildScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const GuildAggregateArgsSchema: z.ZodType<Prisma.GuildAggregateArgs> = z
  .object({
    where: GuildWhereInputSchema.optional(),
    orderBy: z
      .union([
        GuildOrderByWithRelationInputSchema.array(),
        GuildOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: GuildWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const GuildGroupByArgsSchema: z.ZodType<Prisma.GuildGroupByArgs> = z
  .object({
    where: GuildWhereInputSchema.optional(),
    orderBy: z
      .union([
        GuildOrderByWithAggregationInputSchema.array(),
        GuildOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: GuildScalarFieldEnumSchema.array(),
    having: GuildScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const GuildFindUniqueArgsSchema: z.ZodType<Prisma.GuildFindUniqueArgs> =
  z
    .object({
      select: GuildSelectSchema.optional(),
      include: GuildIncludeSchema.optional(),
      where: GuildWhereUniqueInputSchema,
    })
    .strict();

export const GuildFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GuildFindUniqueOrThrowArgs> =
  z
    .object({
      select: GuildSelectSchema.optional(),
      include: GuildIncludeSchema.optional(),
      where: GuildWhereUniqueInputSchema,
    })
    .strict();

export const SettingFindFirstArgsSchema: z.ZodType<Prisma.SettingFindFirstArgs> =
  z
    .object({
      select: SettingSelectSchema.optional(),
      include: SettingIncludeSchema.optional(),
      where: SettingWhereInputSchema.optional(),
      orderBy: z
        .union([
          SettingOrderByWithRelationInputSchema.array(),
          SettingOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SettingWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SettingScalarFieldEnumSchema,
          SettingScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SettingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SettingFindFirstOrThrowArgs> =
  z
    .object({
      select: SettingSelectSchema.optional(),
      include: SettingIncludeSchema.optional(),
      where: SettingWhereInputSchema.optional(),
      orderBy: z
        .union([
          SettingOrderByWithRelationInputSchema.array(),
          SettingOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SettingWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SettingScalarFieldEnumSchema,
          SettingScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SettingFindManyArgsSchema: z.ZodType<Prisma.SettingFindManyArgs> =
  z
    .object({
      select: SettingSelectSchema.optional(),
      include: SettingIncludeSchema.optional(),
      where: SettingWhereInputSchema.optional(),
      orderBy: z
        .union([
          SettingOrderByWithRelationInputSchema.array(),
          SettingOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SettingWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SettingScalarFieldEnumSchema,
          SettingScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SettingAggregateArgsSchema: z.ZodType<Prisma.SettingAggregateArgs> =
  z
    .object({
      where: SettingWhereInputSchema.optional(),
      orderBy: z
        .union([
          SettingOrderByWithRelationInputSchema.array(),
          SettingOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SettingWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SettingGroupByArgsSchema: z.ZodType<Prisma.SettingGroupByArgs> = z
  .object({
    where: SettingWhereInputSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithAggregationInputSchema.array(),
        SettingOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SettingScalarFieldEnumSchema.array(),
    having: SettingScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SettingFindUniqueArgsSchema: z.ZodType<Prisma.SettingFindUniqueArgs> =
  z
    .object({
      select: SettingSelectSchema.optional(),
      include: SettingIncludeSchema.optional(),
      where: SettingWhereUniqueInputSchema,
    })
    .strict();

export const SettingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SettingFindUniqueOrThrowArgs> =
  z
    .object({
      select: SettingSelectSchema.optional(),
      include: SettingIncludeSchema.optional(),
      where: SettingWhereUniqueInputSchema,
    })
    .strict();

export const ChannelFindFirstArgsSchema: z.ZodType<Prisma.ChannelFindFirstArgs> =
  z
    .object({
      select: ChannelSelectSchema.optional(),
      include: ChannelIncludeSchema.optional(),
      where: ChannelWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChannelOrderByWithRelationInputSchema.array(),
          ChannelOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChannelWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChannelScalarFieldEnumSchema,
          ChannelScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindFirstOrThrowArgs> =
  z
    .object({
      select: ChannelSelectSchema.optional(),
      include: ChannelIncludeSchema.optional(),
      where: ChannelWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChannelOrderByWithRelationInputSchema.array(),
          ChannelOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChannelWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChannelScalarFieldEnumSchema,
          ChannelScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelFindManyArgsSchema: z.ZodType<Prisma.ChannelFindManyArgs> =
  z
    .object({
      select: ChannelSelectSchema.optional(),
      include: ChannelIncludeSchema.optional(),
      where: ChannelWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChannelOrderByWithRelationInputSchema.array(),
          ChannelOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChannelWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ChannelScalarFieldEnumSchema,
          ChannelScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelAggregateArgsSchema: z.ZodType<Prisma.ChannelAggregateArgs> =
  z
    .object({
      where: ChannelWhereInputSchema.optional(),
      orderBy: z
        .union([
          ChannelOrderByWithRelationInputSchema.array(),
          ChannelOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ChannelWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ChannelGroupByArgsSchema: z.ZodType<Prisma.ChannelGroupByArgs> = z
  .object({
    where: ChannelWhereInputSchema.optional(),
    orderBy: z
      .union([
        ChannelOrderByWithAggregationInputSchema.array(),
        ChannelOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ChannelScalarFieldEnumSchema.array(),
    having: ChannelScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ChannelFindUniqueArgsSchema: z.ZodType<Prisma.ChannelFindUniqueArgs> =
  z
    .object({
      select: ChannelSelectSchema.optional(),
      include: ChannelIncludeSchema.optional(),
      where: ChannelWhereUniqueInputSchema,
    })
    .strict();

export const ChannelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindUniqueOrThrowArgs> =
  z
    .object({
      select: ChannelSelectSchema.optional(),
      include: ChannelIncludeSchema.optional(),
      where: ChannelWhereUniqueInputSchema,
    })
    .strict();

export const VideoFindFirstArgsSchema: z.ZodType<Prisma.VideoFindFirstArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VideoOrderByWithRelationInputSchema.array(),
        VideoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const VideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoFindFirstOrThrowArgs> =
  z
    .object({
      select: VideoSelectSchema.optional(),
      include: VideoIncludeSchema.optional(),
      where: VideoWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoOrderByWithRelationInputSchema.array(),
          VideoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VideoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const VideoFindManyArgsSchema: z.ZodType<Prisma.VideoFindManyArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VideoOrderByWithRelationInputSchema.array(),
        VideoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const VideoAggregateArgsSchema: z.ZodType<Prisma.VideoAggregateArgs> = z
  .object({
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VideoOrderByWithRelationInputSchema.array(),
        VideoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VideoGroupByArgsSchema: z.ZodType<Prisma.VideoGroupByArgs> = z
  .object({
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VideoOrderByWithAggregationInputSchema.array(),
        VideoOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: VideoScalarFieldEnumSchema.array(),
    having: VideoScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VideoFindUniqueArgsSchema: z.ZodType<Prisma.VideoFindUniqueArgs> =
  z
    .object({
      select: VideoSelectSchema.optional(),
      include: VideoIncludeSchema.optional(),
      where: VideoWhereUniqueInputSchema,
    })
    .strict();

export const VideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoFindUniqueOrThrowArgs> =
  z
    .object({
      select: VideoSelectSchema.optional(),
      include: VideoIncludeSchema.optional(),
      where: VideoWhereUniqueInputSchema,
    })
    .strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const RequestFindFirstArgsSchema: z.ZodType<Prisma.RequestFindFirstArgs> =
  z
    .object({
      select: RequestSelectSchema.optional(),
      include: RequestIncludeSchema.optional(),
      where: RequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          RequestOrderByWithRelationInputSchema.array(),
          RequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RequestScalarFieldEnumSchema,
          RequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const RequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RequestFindFirstOrThrowArgs> =
  z
    .object({
      select: RequestSelectSchema.optional(),
      include: RequestIncludeSchema.optional(),
      where: RequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          RequestOrderByWithRelationInputSchema.array(),
          RequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RequestScalarFieldEnumSchema,
          RequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const RequestFindManyArgsSchema: z.ZodType<Prisma.RequestFindManyArgs> =
  z
    .object({
      select: RequestSelectSchema.optional(),
      include: RequestIncludeSchema.optional(),
      where: RequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          RequestOrderByWithRelationInputSchema.array(),
          RequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RequestScalarFieldEnumSchema,
          RequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const RequestAggregateArgsSchema: z.ZodType<Prisma.RequestAggregateArgs> =
  z
    .object({
      where: RequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          RequestOrderByWithRelationInputSchema.array(),
          RequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const RequestGroupByArgsSchema: z.ZodType<Prisma.RequestGroupByArgs> = z
  .object({
    where: RequestWhereInputSchema.optional(),
    orderBy: z
      .union([
        RequestOrderByWithAggregationInputSchema.array(),
        RequestOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: RequestScalarFieldEnumSchema.array(),
    having: RequestScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RequestFindUniqueArgsSchema: z.ZodType<Prisma.RequestFindUniqueArgs> =
  z
    .object({
      select: RequestSelectSchema.optional(),
      include: RequestIncludeSchema.optional(),
      where: RequestWhereUniqueInputSchema,
    })
    .strict();

export const RequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RequestFindUniqueOrThrowArgs> =
  z
    .object({
      select: RequestSelectSchema.optional(),
      include: RequestIncludeSchema.optional(),
      where: RequestWhereUniqueInputSchema,
    })
    .strict();

export const GuildCreateArgsSchema: z.ZodType<Prisma.GuildCreateArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    data: z.union([GuildCreateInputSchema, GuildUncheckedCreateInputSchema]),
  })
  .strict();

export const GuildUpsertArgsSchema: z.ZodType<Prisma.GuildUpsertArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
    create: z.union([GuildCreateInputSchema, GuildUncheckedCreateInputSchema]),
    update: z.union([GuildUpdateInputSchema, GuildUncheckedUpdateInputSchema]),
  })
  .strict();

export const GuildCreateManyArgsSchema: z.ZodType<Prisma.GuildCreateManyArgs> =
  z
    .object({
      data: z.union([
        GuildCreateManyInputSchema,
        GuildCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GuildDeleteArgsSchema: z.ZodType<Prisma.GuildDeleteArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    where: GuildWhereUniqueInputSchema,
  })
  .strict();

export const GuildUpdateArgsSchema: z.ZodType<Prisma.GuildUpdateArgs> = z
  .object({
    select: GuildSelectSchema.optional(),
    include: GuildIncludeSchema.optional(),
    data: z.union([GuildUpdateInputSchema, GuildUncheckedUpdateInputSchema]),
    where: GuildWhereUniqueInputSchema,
  })
  .strict();

export const GuildUpdateManyArgsSchema: z.ZodType<Prisma.GuildUpdateManyArgs> =
  z
    .object({
      data: z.union([
        GuildUpdateManyMutationInputSchema,
        GuildUncheckedUpdateManyInputSchema,
      ]),
      where: GuildWhereInputSchema.optional(),
    })
    .strict();

export const GuildDeleteManyArgsSchema: z.ZodType<Prisma.GuildDeleteManyArgs> =
  z
    .object({
      where: GuildWhereInputSchema.optional(),
    })
    .strict();

export const SettingCreateArgsSchema: z.ZodType<Prisma.SettingCreateArgs> = z
  .object({
    select: SettingSelectSchema.optional(),
    include: SettingIncludeSchema.optional(),
    data: z.union([
      SettingCreateInputSchema,
      SettingUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SettingUpsertArgsSchema: z.ZodType<Prisma.SettingUpsertArgs> = z
  .object({
    select: SettingSelectSchema.optional(),
    include: SettingIncludeSchema.optional(),
    where: SettingWhereUniqueInputSchema,
    create: z.union([
      SettingCreateInputSchema,
      SettingUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SettingUpdateInputSchema,
      SettingUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SettingCreateManyArgsSchema: z.ZodType<Prisma.SettingCreateManyArgs> =
  z
    .object({
      data: z.union([
        SettingCreateManyInputSchema,
        SettingCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SettingDeleteArgsSchema: z.ZodType<Prisma.SettingDeleteArgs> = z
  .object({
    select: SettingSelectSchema.optional(),
    include: SettingIncludeSchema.optional(),
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const SettingUpdateArgsSchema: z.ZodType<Prisma.SettingUpdateArgs> = z
  .object({
    select: SettingSelectSchema.optional(),
    include: SettingIncludeSchema.optional(),
    data: z.union([
      SettingUpdateInputSchema,
      SettingUncheckedUpdateInputSchema,
    ]),
    where: SettingWhereUniqueInputSchema,
  })
  .strict();

export const SettingUpdateManyArgsSchema: z.ZodType<Prisma.SettingUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SettingUpdateManyMutationInputSchema,
        SettingUncheckedUpdateManyInputSchema,
      ]),
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export const SettingDeleteManyArgsSchema: z.ZodType<Prisma.SettingDeleteManyArgs> =
  z
    .object({
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export const ChannelCreateArgsSchema: z.ZodType<Prisma.ChannelCreateArgs> = z
  .object({
    select: ChannelSelectSchema.optional(),
    include: ChannelIncludeSchema.optional(),
    data: z.union([
      ChannelCreateInputSchema,
      ChannelUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ChannelUpsertArgsSchema: z.ZodType<Prisma.ChannelUpsertArgs> = z
  .object({
    select: ChannelSelectSchema.optional(),
    include: ChannelIncludeSchema.optional(),
    where: ChannelWhereUniqueInputSchema,
    create: z.union([
      ChannelCreateInputSchema,
      ChannelUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ChannelUpdateInputSchema,
      ChannelUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ChannelCreateManyArgsSchema: z.ZodType<Prisma.ChannelCreateManyArgs> =
  z
    .object({
      data: z.union([
        ChannelCreateManyInputSchema,
        ChannelCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ChannelDeleteArgsSchema: z.ZodType<Prisma.ChannelDeleteArgs> = z
  .object({
    select: ChannelSelectSchema.optional(),
    include: ChannelIncludeSchema.optional(),
    where: ChannelWhereUniqueInputSchema,
  })
  .strict();

export const ChannelUpdateArgsSchema: z.ZodType<Prisma.ChannelUpdateArgs> = z
  .object({
    select: ChannelSelectSchema.optional(),
    include: ChannelIncludeSchema.optional(),
    data: z.union([
      ChannelUpdateInputSchema,
      ChannelUncheckedUpdateInputSchema,
    ]),
    where: ChannelWhereUniqueInputSchema,
  })
  .strict();

export const ChannelUpdateManyArgsSchema: z.ZodType<Prisma.ChannelUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ChannelUpdateManyMutationInputSchema,
        ChannelUncheckedUpdateManyInputSchema,
      ]),
      where: ChannelWhereInputSchema.optional(),
    })
    .strict();

export const ChannelDeleteManyArgsSchema: z.ZodType<Prisma.ChannelDeleteManyArgs> =
  z
    .object({
      where: ChannelWhereInputSchema.optional(),
    })
    .strict();

export const VideoCreateArgsSchema: z.ZodType<Prisma.VideoCreateArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    data: z.union([VideoCreateInputSchema, VideoUncheckedCreateInputSchema]),
  })
  .strict();

export const VideoUpsertArgsSchema: z.ZodType<Prisma.VideoUpsertArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    where: VideoWhereUniqueInputSchema,
    create: z.union([VideoCreateInputSchema, VideoUncheckedCreateInputSchema]),
    update: z.union([VideoUpdateInputSchema, VideoUncheckedUpdateInputSchema]),
  })
  .strict();

export const VideoCreateManyArgsSchema: z.ZodType<Prisma.VideoCreateManyArgs> =
  z
    .object({
      data: z.union([
        VideoCreateManyInputSchema,
        VideoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VideoDeleteArgsSchema: z.ZodType<Prisma.VideoDeleteArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const VideoUpdateArgsSchema: z.ZodType<Prisma.VideoUpdateArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    include: VideoIncludeSchema.optional(),
    data: z.union([VideoUpdateInputSchema, VideoUncheckedUpdateInputSchema]),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const VideoUpdateManyArgsSchema: z.ZodType<Prisma.VideoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VideoUpdateManyMutationInputSchema,
        VideoUncheckedUpdateManyInputSchema,
      ]),
      where: VideoWhereInputSchema.optional(),
    })
    .strict();

export const VideoDeleteManyArgsSchema: z.ZodType<Prisma.VideoDeleteManyArgs> =
  z
    .object({
      where: VideoWhereInputSchema.optional(),
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const RequestCreateArgsSchema: z.ZodType<Prisma.RequestCreateArgs> = z
  .object({
    select: RequestSelectSchema.optional(),
    include: RequestIncludeSchema.optional(),
    data: z.union([
      RequestCreateInputSchema,
      RequestUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const RequestUpsertArgsSchema: z.ZodType<Prisma.RequestUpsertArgs> = z
  .object({
    select: RequestSelectSchema.optional(),
    include: RequestIncludeSchema.optional(),
    where: RequestWhereUniqueInputSchema,
    create: z.union([
      RequestCreateInputSchema,
      RequestUncheckedCreateInputSchema,
    ]),
    update: z.union([
      RequestUpdateInputSchema,
      RequestUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const RequestCreateManyArgsSchema: z.ZodType<Prisma.RequestCreateManyArgs> =
  z
    .object({
      data: z.union([
        RequestCreateManyInputSchema,
        RequestCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RequestDeleteArgsSchema: z.ZodType<Prisma.RequestDeleteArgs> = z
  .object({
    select: RequestSelectSchema.optional(),
    include: RequestIncludeSchema.optional(),
    where: RequestWhereUniqueInputSchema,
  })
  .strict();

export const RequestUpdateArgsSchema: z.ZodType<Prisma.RequestUpdateArgs> = z
  .object({
    select: RequestSelectSchema.optional(),
    include: RequestIncludeSchema.optional(),
    data: z.union([
      RequestUpdateInputSchema,
      RequestUncheckedUpdateInputSchema,
    ]),
    where: RequestWhereUniqueInputSchema,
  })
  .strict();

export const RequestUpdateManyArgsSchema: z.ZodType<Prisma.RequestUpdateManyArgs> =
  z
    .object({
      data: z.union([
        RequestUpdateManyMutationInputSchema,
        RequestUncheckedUpdateManyInputSchema,
      ]),
      where: RequestWhereInputSchema.optional(),
    })
    .strict();

export const RequestDeleteManyArgsSchema: z.ZodType<Prisma.RequestDeleteManyArgs> =
  z
    .object({
      where: RequestWhereInputSchema.optional(),
    })
    .strict();
