import { AuthenticationConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  LoginTermsOfService,
  LoginText,
} from "../../../../app/components/common/MDXContent/hca-dcp";

export function getAuthenticationConfig(
  portalURL: string
): AuthenticationConfig {
  return {
    googleGISAuthConfig: {
      clientId:
        "713613812354-ckf448r07ahvh8o1hjfj38tp91j9gpq8.apps.googleusercontent.com",
      googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    },
    termsOfService: <LoginTermsOfService portalURL={portalURL} />,
    terraAuthConfig: {
      termsOfServiceEndpoint:
        "https://sam.dsde-dev.broadinstitute.org/register/user/v2/self/termsOfServiceDetails",
      terraProfileEndpoint:
        "https://sam.dsde-dev.broadinstitute.org/register/user/v1",
    },
    text: <LoginText portalURL={portalURL} />,
    title: "Sign in to your account",
  };
}
