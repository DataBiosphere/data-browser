import { Link as DXLink } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import styled from "@emotion/styled";

export const Link = styled(DXLink)`
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
