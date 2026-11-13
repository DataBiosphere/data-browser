import { BreakpointKey } from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { Breakpoints } from "@mui/system";
import { HTTPError, Options as KyOptions } from "ky";

const KY_RETRY_STATUSES = [408, 413, 429, 500, 502, 503, 504];

export const AZUL_KY_OPTIONS = {
  retry: {
    // Any status code that can be retried should have its retry delay based on Retry-After
    afterStatusCodes: KY_RETRY_STATUSES,
    shouldRetry({ error }): boolean | undefined {
      // If the Retry-After header exists and has content, use default behavior
      if (
        error instanceof HTTPError &&
        error.response.headers.get("Retry-After")
      ) {
        return undefined;
      }
      // Otherwise, never retry requests that received responses, and use default behavior for those that didn't (e.g. due to network errors)
      return "response" in error ? false : undefined;
    },
    statusCodes: KY_RETRY_STATUSES,
  },
} satisfies KyOptions;

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

export const GIT_HUB_REPO_URL = "https://github.com/DataBiosphere/data-browser";

export const VISIBLE: Record<
  string,
  Partial<Record<BreakpointKey, boolean>>
> = {
  MD_DOWN: { lg: false, md: false },
  NEVER: { lg: false, md: false, sm: false, xs: false },
};
