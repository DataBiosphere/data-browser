import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import { getGoogleProvider, TERRA_SERVICE } from "./constants";

/**
 * Returns the authentication config for HCA DCP MA-PROD environment.
 * @param dataSourceUrl - Data source URL.
 * @returns - Authentication config for HCA DCP MA-PROD environment.
 */
export function getAuthentication(dataSourceUrl: string): AuthenticationConfig {
  return {
    providers: [getGoogleProvider(dataSourceUrl)],
    services: [TERRA_SERVICE],
    termsOfService: MDX.LoginTermsOfService({}),
    text: MDX.LoginText({}),
    title: "Sign in to your account",
  };
}
