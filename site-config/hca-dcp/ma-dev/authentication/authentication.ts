import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getGoogleProvider, TERRA_SERVICE } from "./constants";

export function getAuthenticationConfig(
  authenticationConfig: AuthenticationConfig,
  dataSourceUrl: string
): AuthenticationConfig {
  const authentication = { ...authenticationConfig };
  authentication.providers = [getGoogleProvider(dataSourceUrl)];
  authentication.services = [TERRA_SERVICE];
  return authentication;
}
