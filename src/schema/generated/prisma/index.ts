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

export const GuildScalarFieldEnumSchema = z.enum(['id', 'name']);

export const SettingScalarFieldEnumSchema = z.enum(['id', 'language']);

export const ChannelScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'user',
  'url',
]);

export const VideoScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'url',
  'channelId',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

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
});

export type Guild = z.infer<typeof GuildSchema>;

// GUILD RELATION SCHEMA
//------------------------------------------------------

export type GuildRelations = {
  Setting?: SettingWithRelations | null;
};

export type GuildWithRelations = z.infer<typeof GuildSchema> & GuildRelations;

export const GuildWithRelationsSchema: z.ZodType<GuildWithRelations> =
  GuildSchema.merge(
    z.object({
      Setting: z.lazy(() => SettingWithRelationsSchema).nullable(),
    })
  );

/////////////////////////////////////////
// SETTING SCHEMA
/////////////////////////////////////////

export const SettingSchema = z.object({
  language: LanguageSchema,
  id: z.string(),
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
});

export type Video = z.infer<typeof VideoSchema>;

// VIDEO RELATION SCHEMA
//------------------------------------------------------

export type VideoRelations = {
  channel: ChannelWithRelations;
};

export type VideoWithRelations = z.infer<typeof VideoSchema> & VideoRelations;

export const VideoWithRelationsSchema: z.ZodType<VideoWithRelations> =
  VideoSchema.merge(
    z.object({
      channel: z.lazy(() => ChannelWithRelationsSchema),
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
  })
  .strict();

export const GuildArgsSchema: z.ZodType<Prisma.GuildArgs> = z
  .object({
    select: z.lazy(() => GuildSelectSchema).optional(),
    include: z.lazy(() => GuildIncludeSchema).optional(),
  })
  .strict();

export const GuildSelectSchema: z.ZodType<Prisma.GuildSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    Setting: z.union([z.boolean(), z.lazy(() => SettingArgsSchema)]).optional(),
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
  })
  .strict();

export const VideoArgsSchema: z.ZodType<Prisma.VideoArgs> = z
  .object({
    select: z.lazy(() => VideoSelectSchema).optional(),
    include: z.lazy(() => VideoIncludeSchema).optional(),
  })
  .strict();

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    url: z.boolean().optional(),
    channelId: z.boolean().optional(),
    channel: z.union([z.boolean(), z.lazy(() => ChannelArgsSchema)]).optional(),
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
    Setting: z
      .union([
        z.lazy(() => SettingNullableRelationFilterSchema),
        z.lazy(() => SettingWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const GuildOrderByWithRelationInputSchema: z.ZodType<Prisma.GuildOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      Setting: z.lazy(() => SettingOrderByWithRelationInputSchema).optional(),
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
          Setting: z
            .union([
              z.lazy(() => SettingNullableRelationFilterSchema),
              z.lazy(() => SettingWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict()
    );

export const GuildOrderByWithAggregationInputSchema: z.ZodType<Prisma.GuildOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
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
    channel: z
      .union([
        z.lazy(() => ChannelRelationFilterSchema),
        z.lazy(() => ChannelWhereInputSchema),
      ])
      .optional(),
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
      channel: z.lazy(() => ChannelOrderByWithRelationInputSchema).optional(),
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
          channel: z
            .union([
              z.lazy(() => ChannelRelationFilterSchema),
              z.lazy(() => ChannelWhereInputSchema),
            ])
            .optional(),
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
    })
    .strict();

export const GuildCreateInputSchema: z.ZodType<Prisma.GuildCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    Setting: z
      .lazy(() => SettingCreateNestedOneWithoutGuildInputSchema)
      .optional(),
  })
  .strict();

export const GuildUncheckedCreateInputSchema: z.ZodType<Prisma.GuildUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      Setting: z
        .lazy(() => SettingUncheckedCreateNestedOneWithoutGuildInputSchema)
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
    Setting: z
      .lazy(() => SettingUpdateOneWithoutGuildNestedInputSchema)
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
      Setting: z
        .lazy(() => SettingUncheckedUpdateOneWithoutGuildNestedInputSchema)
        .optional(),
    })
    .strict();

export const GuildCreateManyInputSchema: z.ZodType<Prisma.GuildCreateManyInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
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
    })
    .strict();

export const SettingCreateInputSchema: z.ZodType<Prisma.SettingCreateInput> = z
  .object({
    language: z.lazy(() => LanguageSchema).optional(),
    guild: z.lazy(() => GuildCreateNestedOneWithoutSettingInputSchema),
  })
  .strict();

export const SettingUncheckedCreateInputSchema: z.ZodType<Prisma.SettingUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      language: z.lazy(() => LanguageSchema).optional(),
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
    })
    .strict();

export const SettingCreateManyInputSchema: z.ZodType<Prisma.SettingCreateManyInput> =
  z
    .object({
      id: z.string(),
      language: z.lazy(() => LanguageSchema).optional(),
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
    })
    .strict();

export const ChannelCreateInputSchema: z.ZodType<Prisma.ChannelCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    user: z.string(),
    url: z.string(),
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
    })
    .strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    channel: z.lazy(() => ChannelCreateNestedOneWithoutVideoInputSchema),
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
    channel: z
      .lazy(() => ChannelUpdateOneRequiredWithoutVideoNestedInputSchema)
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

export const GuildCountOrderByAggregateInputSchema: z.ZodType<Prisma.GuildCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuildMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GuildMinOrderByAggregateInputSchema: z.ZodType<Prisma.GuildMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
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
    })
    .strict();

export const SettingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SettingMinOrderByAggregateInputSchema: z.ZodType<Prisma.SettingMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
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
    })
    .strict();

export const ChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
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

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
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

export const SettingCreateWithoutGuildInputSchema: z.ZodType<Prisma.SettingCreateWithoutGuildInput> =
  z
    .object({
      language: z.lazy(() => LanguageSchema).optional(),
    })
    .strict();

export const SettingUncheckedCreateWithoutGuildInputSchema: z.ZodType<Prisma.SettingUncheckedCreateWithoutGuildInput> =
  z
    .object({
      language: z.lazy(() => LanguageSchema).optional(),
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
    })
    .strict();

export const GuildCreateWithoutSettingInputSchema: z.ZodType<Prisma.GuildCreateWithoutSettingInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .strict();

export const GuildUncheckedCreateWithoutSettingInputSchema: z.ZodType<Prisma.GuildUncheckedCreateWithoutSettingInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
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
    })
    .strict();

export const VideoCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoCreateWithoutChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
    })
    .strict();

export const VideoUncheckedCreateWithoutChannelInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
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
    })
    .strict();

export const ChannelCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelCreateWithoutVideoInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
    })
    .strict();

export const ChannelUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutVideoInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      user: z.string(),
      url: z.string(),
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
    })
    .strict();

export const VideoCreateManyChannelInputSchema: z.ZodType<Prisma.VideoCreateManyChannelInput> =
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
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
