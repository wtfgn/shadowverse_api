import NodeCache from "node-cache";
import { useFetchCards } from "../composables/useFetchCards";

export const myCache = new NodeCache({
  stdTTL: 3600, // 1 hour
});

export const updateCache = async () => {
  try {
    // Order matters here because CV field is alwys empty for en
    // and we want to use the cached data to fill it in
    myCache.set("cards_ja", await useFetchCards("ja"));
    myCache.set("cards_zh-tw", await useFetchCards("zh-tw"));
    myCache.set("cards_en", await useFetchCards("en"));
  } catch (error) {
    console.log(error);
  }
}

myCache.on("expired", (key) => {
  console.log(`Cache expired: ${key}`);
  void updateCache();
});

