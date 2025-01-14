import { OAuthProvider } from "@databiosphere/findable-ui/lib/config/entities";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/profile/types";

export const OAUTH_GOOGLE_SIGN_IN: Pick<
  OAuthProvider<GoogleProfile>,
  "authorization" | "userinfo"
> = {
  authorization: {
    params: {
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    },
  },
  userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
};
