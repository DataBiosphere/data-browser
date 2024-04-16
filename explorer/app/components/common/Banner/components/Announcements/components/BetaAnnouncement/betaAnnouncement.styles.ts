import { BannerPrimary as DXBannerPrimary } from "@databiosphere/findable-ui/lib/components/common/Banner/components/BannerPrimary/bannerPrimary";
import styled from "@emotion/styled";

export const Banner = styled(DXBannerPrimary)`
  .MuiAlert-message {
    p {
      font: inherit;
    }

    a,
    .MuiLink-root {
      color: inherit;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;
