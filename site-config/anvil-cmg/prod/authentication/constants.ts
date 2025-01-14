import { OAuthProvider } from "@databiosphere/findable-ui/lib/config/entities";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/profile/types";
import { GOOGLE_SIGN_IN_PROVIDER } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/service/constants";

import { OAUTH_GOOGLE_SIGN_IN } from "../../../common/authentication";

const CLIENT_ID =
  "1055427471534-r7j5sdnhv47cuq10nsdejrc0pajd1qqv.apps.googleusercontent.com";

export const GOOGLE_PROVIDER: OAuthProvider<GoogleProfile> = {
  ...GOOGLE_SIGN_IN_PROVIDER,
  ...OAUTH_GOOGLE_SIGN_IN,
  clientId: CLIENT_ID,
};

export const TERRA_SERVICE = {
  endpoint: {
    nihStatus:
      "https://firecloud-orchestration.dsde-prod.broadinstitute.org/api/nih/status",
    profile: "https://sam.dsde-prod.broadinstitute.org/register/user/v1",
    tos: "https://sam.dsde-prod.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
  },
  id: "terra",
};
