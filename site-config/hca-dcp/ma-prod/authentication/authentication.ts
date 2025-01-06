import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { GOOGLE_PROVIDER, TERRA_SERVICE } from "./constants";

export function getAuthenticationConfig(
  authenticationConfig: AuthenticationConfig
): AuthenticationConfig {
  const authentication = { ...authenticationConfig };
  authentication.providers = [GOOGLE_PROVIDER];
  authentication.services = [TERRA_SERVICE];
  return authentication;
}
