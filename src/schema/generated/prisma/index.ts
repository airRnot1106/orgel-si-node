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
