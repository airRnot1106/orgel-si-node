"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineSettingFactory = exports.defineGuildFactory = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = exports.initialize = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return internal_2.initialize; } });
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const modelFieldDefinitions = [{
        name: "Guild",
        fields: [{
                name: "Setting",
                type: "Setting",
                relationName: "GuildToSetting"
            }]
    }, {
        name: "Setting",
        fields: [{
                name: "guild",
                type: "Guild",
                relationName: "GuildToSetting"
            }]
    }];
function isGuildSettingFactory(x) {
    return x?._factoryFor === "Setting";
}
function autoGenerateGuildScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Guild", fieldName: "id", isId: true, isUnique: false, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Guild", fieldName: "name", isId: false, isUnique: false, seq })
    };
}
function defineGuildFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Guild", modelFieldDefinitions);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateGuildScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Setting: isGuildSettingFactory(defaultData.Setting) ? {
                    create: await defaultData.Setting.build()
                } : defaultData.Setting
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const data = await build(inputData).then(screen);
            return await (0, internal_1.getClient)().guild.create({ data });
        };
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Guild",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
/**
 * Define factory for {@link Guild} model.
 *
 * @param options
 * @returns factory {@link GuildFactoryInterface}
 */
function defineGuildFactory(options) {
    return defineGuildFactoryInternal(options ?? {});
}
exports.defineGuildFactory = defineGuildFactory;
function isSettingguildFactory(x) {
    return x?._factoryFor === "Guild";
}
function autoGenerateSettingScalarsOrEnums({ seq }) {
    return {};
}
function defineSettingFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Setting", modelFieldDefinitions);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSettingScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                guild: isSettingguildFactory(defaultData.guild) ? {
                    create: await defaultData.guild.build()
                } : defaultData.guild
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const data = await build(inputData).then(screen);
            return await (0, internal_1.getClient)().setting.create({ data });
        };
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Setting",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
/**
 * Define factory for {@link Setting} model.
 *
 * @param options
 * @returns factory {@link SettingFactoryInterface}
 */
function defineSettingFactory(options) {
    return defineSettingFactoryInternal(options);
}
exports.defineSettingFactory = defineSettingFactory;
