import { AuthenticationConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";

export const authenticationConfig: AuthenticationConfig = {
  googleGISAuthConfig: {
    clientId:
      "561542988117-9e04fhfrc9su130eb2ggea7bdppolkjq.apps.googleusercontent.com",
    googleProfileEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    terraProfileEndpoint:
      "https://sam.dsde-prod.broadinstitute.org/register/user/v1",
  },
  loginNotice: {
    conditionsUrl: "https://example.com/conditions",
    privacyUrl: "https://example.com/privacy",
  },
  text: "You need to create a terra account in order to view restricted access data",
  title: "Sign in to your account",
};
