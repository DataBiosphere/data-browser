import styled from "@emotion/styled";
import { Button } from "../../button";

export const NavLinkDropdownButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.common.white};
  color: inherit;
  padding: 6px 6px 6px 12px;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.light};
  }

  .MuiButton-endIcon {
    margin-left: -6px;
  }
`;
