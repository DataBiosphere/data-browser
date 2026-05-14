import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import { SiteConfig } from "../../../common/entities";
import { getGoogleProvider, TERRA_SERVICE } from "./constants";

/**
 * Returns the authentication config for HCA DCP MA-DEV environment.
 * @param dataSourceUrl - Data source URL.
 * @returns - Updated authentication config.
 */
export function getAuthentication(
  dataSourceUrl: string
): SiteConfig["authentication"] {
  return {
    providers: [getGoogleProvider(dataSourceUrl)],
    services: [TERRA_SERVICE],
    termsOfService: MDX.LoginTermsOfService({}),
    text: MDX.LoginText({}),
    title: "Sign in to your account",
  };
}
