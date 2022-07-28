import { Button } from "./button";
import styled from "@emotion/styled";

// Secondary button.
export const ButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark},
    0 1px 0 0 rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.palette.ink};

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.smokeLightest};
  }

  &:active {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark};
  }

  &:disabled {
    color: inherit;
    opacity: 0.5;
  }
`;
