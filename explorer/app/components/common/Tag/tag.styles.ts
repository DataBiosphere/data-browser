import styled from "@emotion/styled";
import { Tag } from "./tag";

export const TagDefault = styled(Tag)`
  background-color: ${({ theme }) => theme.palette.smoke.main};
  border-radius: 4px;
  padding: 2px 6px;
`;

export const TagWarning = styled(TagDefault)`
  background-color: ${({ theme }) => theme.palette.warning.light};
  color: ${({ theme }) => theme.palette.warning.main};
`;
