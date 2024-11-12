import {
  textBodyLarge4002Lines,
  textBodyLarge500,
  textHeading,
  textHeadingLarge,
  textHeadingSmall,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const muiAlert = (props: ThemeProps) => css`
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
      ${textBodyLarge4002Lines(props)};
      gap: 16px;

      .MuiAlertTitle-root {
        ${textHeadingSmall(props)};
      }
    }
  }
`;

const muiBreadcrumbs = () => css`
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
    ${textHeadingLarge};
    margin: 0 0 16px;
  }

  h2 {
    ${textHeading};
    margin: 32px 0 16px;
  }

  h3 {
    ${textHeadingSmall};
    margin: 40px 0 16px;
  }

  h4 {
    ${textBodyLarge500};
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
    ${textBodyLarge4002Lines};
    margin: 0 0 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  ul {
    ${textBodyLarge4002Lines};
    margin: 16px 0;
    padding: 0 0 0 24px;

    li {
      margin: 8px 0;
    }
  }

  ${muiAlert};
  ${muiBreadcrumbs};
`;
