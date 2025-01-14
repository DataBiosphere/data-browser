import { OAuthProvider } from "@databiosphere/findable-ui/lib/config/entities";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/profile/types";
import { GOOGLE_SIGN_IN_PROVIDER } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/service/constants";

import { OAUTH_GOOGLE_SIGN_IN } from "../../../common/authentication";

const CLIENT_ID =
  "473200283737-4pt6e9lraf5jbb650f9kp7ethelv4a8l.apps.googleusercontent.com";

export const GOOGLE_PROVIDER: OAuthProvider<GoogleProfile> = {
  ...GOOGLE_SIGN_IN_PROVIDER,
  ...OAUTH_GOOGLE_SIGN_IN,
  clientId: CLIENT_ID,
};

export const TERRA_SERVICE = {
  endpoint: {
    profile: "https://sam.dsde-prod.broadinstitute.org/register/user/v1",
    tos: "https://sam.dsde-prod.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
  },
  id: "terra",
};
