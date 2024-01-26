import { useCache } from "../composables/useCache";

const { updateCache } = useCache();

export const useInit = async () => {
  await updateCache()
}