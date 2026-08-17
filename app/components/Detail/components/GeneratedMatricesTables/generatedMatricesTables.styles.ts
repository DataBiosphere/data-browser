import {
  sectionMargin,
  sectionMarginSm,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Alert } from "@mui/material";

export const SectionTitle = styled("h4")`
  ${sectionMargin};
  font: ${FONT.BODY_500};

  ${bpUpSm} {
    ${sectionMarginSm};
  }
`;

export const StyledAlert = styled(Alert)`
  .MuiAlert-message {
    font: ${FONT.BODY_400_2_LINES};
  }

  ${sectionMargin};

  ${bpUpSm} {
    ${sectionMarginSm};
  }
`;
