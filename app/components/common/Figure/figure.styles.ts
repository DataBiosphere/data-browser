import { smokeMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Figure = styled.figure`
  margin: 32px 0;

  img {
    border: 1px solid ${smokeMain};
    border-radius: 6px;
    margin: 0 auto;
    max-width: 100%;
  }

  figcaption {
    ${textBody400};
    margin-top: 8px;
    text-align: center;
  }
`;
