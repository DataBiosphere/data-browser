import {
  sectionMargin,
  sectionMarginSm,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import {
  textBody4002Lines,
  textBody500,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { TABLET } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";
import { Alert } from "@mui/material";

export const SectionTitle = styled("h4")`
  ${textBody500}
  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }
`;

export const StyledAlert = styled(Alert)`
  .MuiAlert-message {
    ${textBody4002Lines};
  }

  ${sectionMargin}
  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    ${sectionMarginSm}
  }
`;
