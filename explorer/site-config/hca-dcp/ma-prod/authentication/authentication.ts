import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";

export function getAuthenticationConfig(
  authenticationConfig: AuthenticationConfig
): AuthenticationConfig {
  const authentication = { ...authenticationConfig };
  if (authentication.googleGISAuthConfig) {
    authentication.googleGISAuthConfig.clientId =
      "473200283737-4pt6e9lraf5jbb650f9kp7ethelv4a8l.apps.googleusercontent.com";
  }
  if (authentication.terraAuthConfig) {
    authentication.terraAuthConfig.termsOfServiceEndpoint =
      "https://sam.dsde-prod.broadinstitute.org/register/user/v2/self/termsOfServiceDetails";
    authentication.terraAuthConfig.terraProfileEndpoint =
      "https://sam.dsde-prod.broadinstitute.org/register/user/v1";
  }
  return authentication;
}
