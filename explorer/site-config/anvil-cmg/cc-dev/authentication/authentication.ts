import { AuthenticationConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as MDX from "../../../../app/content/anvil-cmg";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "89097066845-brrao60r5vdh08uptd5v4m4vf70pt4uk.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    terraProfileEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
  },
  termsOfService: MDX.RenderComponent({ Component: MDX.LoginTermsOfService }),
  text: MDX.RenderComponent({ Component: MDX.LoginText }),
  title: "Sign in to your account",
  warning: MDX.RenderComponent({ Component: MDX.LoginWarning }),
};
