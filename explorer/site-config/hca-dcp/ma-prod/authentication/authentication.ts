import { AuthenticationConfig } from "../../../../../../data-explorer/packages/data-explorer-ui/src/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";

// TODO(cc) update authentication config.

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "561542988117-9e04fhfrc9su130eb2ggea7bdppolkjq.apps.googleusercontent.com", // TODO(cc) update clientId.
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
