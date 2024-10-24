import { BreakpointKey } from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { GoogleProfile } from "@databiosphere/findable-ui/lib/providers/authentication/googleSignIn/profile/types";
import { OAuthProvider } from "@databiosphere/findable-ui/src/config/entities";
import { Breakpoints } from "@mui/system";

export const OAUTH_GOOGLE_SIGN_IN: Pick<
  OAuthProvider<GoogleProfile>,
  "authorization" | "userinfo"
> = {
  authorization: {
    params: {
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    },
  },
  userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
};

export const BREAKPOINTS: Partial<Breakpoints> = {
  values: {
    lg: 1440,
    md: 1280,
    sm: 1024,
    xs: 0,
  } as Breakpoints["values"], // TODO(cc) add "xl" breakpoint.
};

export const FLATTEN: Record<
  string,
  Partial<Record<BreakpointKey, boolean>>
> = {
  XS_ONLY: { xs: true },
};

export const VISIBLE: Record<
  string,
  Partial<Record<BreakpointKey, boolean>>
> = {
  MD_DOWN: { lg: false, md: false },
  NEVER: { lg: false, md: false, sm: false, xs: false },
};
