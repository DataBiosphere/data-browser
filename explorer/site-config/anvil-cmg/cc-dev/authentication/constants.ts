import { OAuthProvider } from "@databiosphere/findable-ui/lib/config/entities";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/providers/authentication/googleSignIn/profile/types";
import { GOOGLE_SIGN_IN_PROVIDER } from "@databiosphere/findable-ui/lib/providers/authentication/googleSignIn/service/constants";
import { OAUTH_GOOGLE_SIGN_IN } from "../../../common/constants";

const CLIENT_ID =
  "561542988117-0o4oticvtp35n48q6o69pnd13chsnkie.apps.googleusercontent.com";

export const GOOGLE_PROVIDER: OAuthProvider<GoogleProfile> = {
  ...GOOGLE_SIGN_IN_PROVIDER,
  ...OAUTH_GOOGLE_SIGN_IN,
  clientId: CLIENT_ID,
};
