import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import { GOOGLE_PROVIDER, TERRA_SERVICE } from "./constants";

/**
 * Returns the authentication config for HCA DCP MA-PROD environment.
 * @returns - Authentication config for HCA DCP MA-PROD environment.
 */
export function getAuthentication(): AuthenticationConfig {
  return {
    providers: [GOOGLE_PROVIDER],
    services: [TERRA_SERVICE],
    termsOfService: MDX.LoginTermsOfService({}),
    text: MDX.LoginText({}),
    title: "Sign in to your account",
  };
}
