import { AuthenticationConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import { TERRA_SERVICE } from "../../dev/authentication/constants";
import { GOOGLE_PROVIDER } from "./constants";

export const authenticationConfig: AuthenticationConfig = {
  providers: [GOOGLE_PROVIDER],
  services: [TERRA_SERVICE],
  termsOfService: MDX.LoginTermsOfService({}),
  text: MDX.LoginText({}),
  title: "Sign in to your account",
  warning: MDX.LoginWarning({}),
};
