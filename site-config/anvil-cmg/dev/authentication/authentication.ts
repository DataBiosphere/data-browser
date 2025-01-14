import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import { GOOGLE_PROVIDER, TERRA_SERVICE } from "./constants";

export const authenticationConfig: AuthenticationConfig = {
  providers: [GOOGLE_PROVIDER],
  services: [TERRA_SERVICE],
  termsOfService: MDX.LoginTermsOfService({}),
  text: MDX.LoginText({}),
  title: "Sign in to your account",
  warning: MDX.LoginWarning({}),
};
