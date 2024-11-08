import { SectionText as DXSectionText } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import styled from "@emotion/styled";
import { Typography as MTypography } from "@mui/material";

export const SectionText = styled(DXSectionText)`
  ul {
    font: inherit;
    margin: 16px 0;
    padding: 0 0 0 24px;
  }

  li {
    margin: 8px 0;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
` as typeof MTypography;
