import { config } from "../config/config";

/**
 * Site specific environment variables
 */
export const ROOT_URL: string | undefined = config().redirectRootToPath;

/**
 * Determine if current deployment environment is development.
 * @returns True if deployment environment is development.
 */
export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === "development";
