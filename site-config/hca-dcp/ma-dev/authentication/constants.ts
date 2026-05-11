import {
  OAUTH_FLOW,
  OAuthProvider,
} from "@databiosphere/findable-ui/lib/config/entities";
import { GOOGLE_SIGN_IN_PROVIDER } from "@databiosphere/findable-ui/lib/google/config";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/google/types";

import { OAUTH_GOOGLE_SIGN_IN } from "../../../common/authentication";

const CLIENT_ID =
  "713613812354-aelk662bncv14d319dk8juce9p11um00.apps.googleusercontent.com";

/**
 * Returns the Google OAuth provider configured for the authorization code
 * flow, with `authorize` derived from the given Azul base URL.
 * @param dataSourceUrl - Azul base URL.
 * @returns Google OAuth provider.
 */
export function getGoogleProvider(
  dataSourceUrl: string
): OAuthProvider<GoogleProfile> {
  return {
    ...GOOGLE_SIGN_IN_PROVIDER,
    ...OAUTH_GOOGLE_SIGN_IN,
    // URL constructor handles trailing-slash variation on dataSourceUrl.
    authorize: new URL("/user/authorize", dataSourceUrl).href,
    clientId: CLIENT_ID,
    flow: OAUTH_FLOW.AUTHORIZATION_CODE,
  };
}

export const TERRA_SERVICE = {
  endpoint: {
    profile: "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
    tos: "https://sam.dsde-dev.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
  },
  id: "terra",
};
