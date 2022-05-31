import { config } from "app/config/config";
import { useRouter } from "next/router";

/**
 * Get the current entity based on the given path
 * @param path url path
 * @returns the current entity or undefined
 */
export const getCurrentEntity = (path: string) => {
  const value = path.replace("/explore/", "");
  return config().entities.find((entity) => entity.route === value);
};

/**
 * @returns the current entity based on the current route
 */
export const useCurrentEntity = () => {
  const router = useRouter();
  const paths = router.asPath.split("/").filter((path) => !!path);

  if (paths.length < 2) {
    return undefined;
  }

  return getCurrentEntity(paths[1]);
};
