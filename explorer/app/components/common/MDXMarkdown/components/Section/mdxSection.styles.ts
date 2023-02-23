import { Section as DXSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import styled from "@emotion/styled";
import {
  textBody4002Lines,
  textBodyLarge500,
} from "../../../../../utils/typographyToCSS";

export const Section = styled(DXSection)`
  display: block;
  gap: 0;

  h3 {
    ${textBodyLarge500};
    margin: 0 0 8px;

    &:nth-of-type(n + 2) {
      margin-top: 20px;
    }
  }

  p {
    ${textBody4002Lines};
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;
