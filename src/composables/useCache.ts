import NodeCache from "node-cache";
import { useFetchCards } from "./useFetchCards";

const myCache = new NodeCache({
  stdTTL: 3600, // 1 hour
});

const updateCache = async () => {
  try {
    myCache.set("cards_en", await useFetchCards("en"));
    myCache.set("cards_ja", await useFetchCards("ja"));
    myCache.set("cards_zh-tw", await useFetchCards("zh-tw"));
  } catch (error) {
    console.log(error);
  }
}

myCache.on("expired", (key) => {
  console.log(`Cache expired: ${key}`);
  void updateCache();
});

export const useCache = () => {
  return { myCache, updateCache };
}

