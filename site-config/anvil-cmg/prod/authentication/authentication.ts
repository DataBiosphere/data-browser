import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "1055427471534-r7j5sdnhv47cuq10nsdejrc0pajd1qqv.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
  },
  termsOfService: MDX.LoginTermsOfService({}),
  terraAuthConfig: {
    termsOfServiceEndpoint:
      "https://sam.dsde-prod.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
    terraNIHProfileEndpoint:
      "https://firecloud-orchestration.dsde-prod.broadinstitute.org/api/nih/status",
    terraProfileEndpoint:
      "https://sam.dsde-prod.broadinstitute.org/register/user/v1",
  },
  text: MDX.LoginText({}),
  title: "Sign in to your account",
  warning: MDX.LoginWarning({}),
};
