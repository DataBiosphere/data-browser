import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "561542988117-9e04fhfrc9su130eb2ggea7bdppolkjq.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
  },
  termsOfService: MDX.LoginTermsOfService({}),
  terraAuthConfig: {
    termsOfServiceEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
    terraNIHProfileEndpoint:
      "https://firecloud-orchestration.dsde-dev.broadinstitute.org/api/nih/status",
    terraProfileEndpoint:
      "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
  },
  text: MDX.LoginText({}),
  title: "Sign in to your account",
  warning: MDX.LoginWarning({}),
};
