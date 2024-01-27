import { updateCache } from "../cache";

export const useInit = async () => {
  await updateCache()
}