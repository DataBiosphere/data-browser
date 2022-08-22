import styled from "@emotion/styled";
import { Button as MButton, ButtonBase } from "@mui/material";
import { Button } from "./button";

// Template constants
const textBody500 = "text-body-500";

// Primary button.
export const ButtonPrimary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.common.white};

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  &:active {
    box-shadow: none;
  }

  &.Mui-disabled {
    color: ${({ theme }) => theme.palette.common.white};
    opacity: 0.5;
  }
` as typeof MButton;

// Secondary button.
export const ButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smoke.dark},
    0 1px 0 0 rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.palette.ink.main};

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.lightest};
  }

  &:active {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smoke.dark};
  }

  &:disabled {
    color: inherit;
    opacity: 0.5;
  }
`;

// Primary text button
export const TextButtonPrimary = styled(ButtonBase)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography[textBody500].fontWeight};
  line-height: ${({ theme }) => theme.typography[textBody500].lineHeight};

  :hover {
    text-decoration: underline;
  }
`;
