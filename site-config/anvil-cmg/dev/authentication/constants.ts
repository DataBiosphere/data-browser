import { OAuthProvider } from "@databiosphere/findable-ui/lib/config/entities";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/google/types";
import { GOOGLE_SIGN_IN_PROVIDER } from "@databiosphere/findable-ui/lib/google/config";

import { OAUTH_GOOGLE_SIGN_IN } from "../../../common/authentication";

const CLIENT_ID =
  "561542988117-9e04fhfrc9su130eb2ggea7bdppolkjq.apps.googleusercontent.com";

export const GOOGLE_PROVIDER: OAuthProvider<GoogleProfile> = {
  ...GOOGLE_SIGN_IN_PROVIDER,
  ...OAUTH_GOOGLE_SIGN_IN,
  clientId: CLIENT_ID,
};

export const TERRA_SERVICE = {
  endpoint: {
    nihStatus:
      "https://externalcreds.dsde-dev.broadinstitute.org/api/oauth/v1/ras",
    profile: "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
    tos: "https://sam.dsde-dev.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
  },
  id: "terra",
};
