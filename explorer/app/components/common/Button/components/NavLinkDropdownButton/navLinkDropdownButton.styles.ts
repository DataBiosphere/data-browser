import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "../../button";

interface Props {
  isActive: boolean;
}

export const NavLinkDropdownButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<Props>`
  background-color: ${({ theme }) => theme.palette.common.white};
  color: inherit;
  padding: 6px 6px 6px 12px;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.light};
  }

  // Button is "active" i.e. menu is open.
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.palette.smoke.light};
    `};

  .MuiButton-endIcon {
    margin-left: -6px;
  }
`;
