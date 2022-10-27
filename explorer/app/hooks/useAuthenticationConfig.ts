import { useConfig } from "app/hooks/useConfig";
import { AuthenticationConfig } from "../config/common/entities";

/**
 * Hook to get the authentication config
 * @returns @see AuthenticationConfig used in the current config.
 */
export const useAuthenticationConfig = (): AuthenticationConfig => {
  const config = useConfig();

  if (!config.authentication) {
    throw new Error(`This config does not have an authentication field set`);
  }

  return config.authentication;
};
