"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCache = exports.myCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const useFetchCards_1 = require("../composables/useFetchCards");
const types_1 = require("../types");
let isUpdatingCache = false;
exports.myCache = new node_cache_1.default({
    stdTTL: 3600, // 1 hour
    deleteOnExpire: false,
});
const updateCache = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isUpdatingCache) {
            return;
        }
        isUpdatingCache = true;
        // Order matters here because CV field is alwys empty for en
        // and we want to use the cached data to fill it in
        exports.myCache.set("cards_ja", yield (0, useFetchCards_1.useFetchCards)("ja"));
        exports.myCache.set("cards_zh-tw", yield (0, useFetchCards_1.useFetchCards)("zh-tw"));
        exports.myCache.set("cards_en", yield (0, useFetchCards_1.useFetchCards)("en"));
        console.log(`[cache]: Cache updated`);
        isUpdatingCache = false;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCache = updateCache;
exports.myCache.on("expired", (key) => {
    console.log(`Cache expired: ${key}`);
    const languageCode = types_1.CacheKeyLanguageCodeMap[key];
    console.log(`[cache]: Fetching cards for ${languageCode}`);
    (0, useFetchCards_1.useFetchCards)(languageCode)
        .then((cards) => {
        exports.myCache.set(key, cards);
    })
        .catch((error) => {
        console.log(error);
    });
});
//# sourceMappingURL=index.js.map