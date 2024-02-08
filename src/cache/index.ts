import NodeCache from "node-cache";
import { useFetchCards } from "../composables/useFetchCards";
import type { CacheKey } from "../types";
import { CacheKeyLanguageCodeMap } from "../types";

let isUpdatingCache = false;

export const myCache = new NodeCache({
  stdTTL: 10, // 1 hour
  deleteOnExpire: false,
});

export const updateCache = async () => {
  try {
    if (isUpdatingCache) {
      return;
    }
    isUpdatingCache = true;
    // Order matters here because CV field is alwys empty for en
    // and we want to use the cached data to fill it in
    myCache.set("cards_ja", await useFetchCards("ja"));
    myCache.set("cards_zh-tw", await useFetchCards("zh-tw"));
    myCache.set("cards_en", await useFetchCards("en"));

    console.log(`[cache]: Cache updated`);
    isUpdatingCache = false;
  } catch (error) {
    console.log(error);
  }
}

myCache.on("expired", (key: CacheKey) => {
  console.log(`Cache expired: ${key}`);
  const languageCode = CacheKeyLanguageCodeMap[key];
  console.log(`[cache]: Fetching cards for ${languageCode}`);
  useFetchCards(languageCode)
    .then((cards) => {
      myCache.set(key, cards);
    })
    .catch((error) => {
      console.log(error);
    });
});

