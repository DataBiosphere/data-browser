import { AuthenticationConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "473200283737-4pt6e9lraf5jbb650f9kp7ethelv4a8l.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
  },
  termsOfService: MDX.RenderComponent({ Component: MDX.LoginTermsOfService }),
  terraAuthConfig: {
    termsOfServiceEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
    terraProfileEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
  },
  text: MDX.RenderComponent({ Component: MDX.LoginText }),
  title: "Sign in to your account",
};
