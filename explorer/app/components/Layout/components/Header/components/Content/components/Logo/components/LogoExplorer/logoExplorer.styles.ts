import { mediaDesktopSmallUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import {
  DESKTOP_SM,
  MOBILE,
} from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const ExplorerWithLogo = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;

  .MuiDivider-root {
    margin-top: 7px;
    max-height: 29px;
  }

  ${({ theme }) => theme.breakpoints.between(MOBILE, DESKTOP_SM)} { {
    img {
      height: 32px;
    }
  }
`;

export const ExplorerText = styled.div`
  align-items: flex-end;
  display: flex;
  height: 40px;

  .MuiTypography-root {
    font-size: 23px;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: -0.4px;
  }

  ${mediaDesktopSmallUp} {
    height: 44px;

    .MuiTypography-root {
      font-size: 26px;
    }
  }
`;
