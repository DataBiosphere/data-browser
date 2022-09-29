import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const FilterLabel = styled(Button)`
  color: ${({ theme }) => theme.palette.ink.main};
  gap: 0;
  justify-content: space-between;
  padding: 6px 0;
  text-transform: none;

  :hover {
    background-color: transparent;
  }

  &.Mui-disabled {
    color: ${({ theme }) => theme.palette.ink.main};
    opacity: 0.3;
  }
`;
