import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/types";
import { typographyToCSS } from "@databiosphere/findable-ui/lib/styles/common/mixins/typography";

const muiAlert = ({ theme }: ThemeProps) => css`
  .MuiAlert-root {
    margin: 24px 0;
    padding: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    .MuiAlert-icon {
      padding: 4px 0;
    }

    .MuiAlert-message {
      font: ${FONT.BODY_LARGE_400_2_LINES};
      gap: 16px;

      .MuiAlertTitle-root {
        ${css(theme.typography["heading-small"])};
      }

      ol > li,
      ul > li {
        margin: 4px 0;

        &:first-of-type {
          margin-top: 0;
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const muiBreadcrumbs = css`
  .MuiBreadcrumbs-root {
    margin-bottom: 8px;

    .MuiBreadcrumbs-li {
      margin: 0;

      .MuiTypography-root {
        margin: 0;
      }
    }
  }
`;

export const Content = styled.div`
  h1 {
    ${typographyToCSS("heading-large")};
    margin: 0 0 16px;
  }

  h2 {
    ${typographyToCSS("heading")};
    margin: 32px 0 16px;
  }

  h3 {
    ${typographyToCSS("heading-small")};
    margin: 40px 0 16px;
  }

  h4 {
    font: ${FONT.BODY_LARGE_500};
    margin: 16px 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:hover {
      a {
        opacity: 1;
      }
    }
  }

  p {
    font: ${FONT.BODY_LARGE_400_2_LINES};
    margin: 0 0 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  ul {
    font: ${FONT.BODY_LARGE_400_2_LINES};
    margin: 16px 0;
    padding: 0 0 0 24px;

    li {
      margin: 8px 0;
    }
  }

  ${muiAlert};
  ${muiBreadcrumbs};
`;
