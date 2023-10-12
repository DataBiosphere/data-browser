import { AuthenticationConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "561542988117-0o4oticvtp35n48q6o69pnd13chsnkie.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
  },
  termsOfService: MDX.RenderComponent({ Component: MDX.LoginTermsOfService }),
  terraAuthConfig: {
    terraNIHProfileEndpoint:
      "https://firecloud-orchestration.dsde-dev.broadinstitute.org/api/nih/status",
    terraProfileEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
  },
  text: MDX.RenderComponent({ Component: MDX.LoginText }),
  title: "Sign in to your account",
  warning: MDX.RenderComponent({ Component: MDX.LoginWarning }),
};
