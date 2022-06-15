import { SiteConfig } from "app/config/model";
import { useRouter } from "next/router";
import { useConfig } from "./useConfig";

/**
 * Get the current entity based on the given path
 * @param path url path
 * @returns the current entity or undefined
 */
export const getCurrentEntity = (path: string, config: SiteConfig) => {
  const value = path.replace("/explore/", "");
  return config.entities.find((entity) => entity.route === value);
};

/**
 * @returns the current entity based on the current route
 */
export const useCurrentEntity = () => {
  const router = useRouter();
  const config = useConfig();
  const paths = router.asPath.split("/").filter((path) => !!path);

  if (paths.length < 2) {
    return undefined;
  }

  return getCurrentEntity(paths[1], config);
};
