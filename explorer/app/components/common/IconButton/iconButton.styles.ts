import styled from "@emotion/styled";
import { IconButton } from "./iconButton";
import { IconButton as MIconButton } from "@mui/material";

// Secondary icon button.
export const IconButtonSecondary = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smoke.dark},
  0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.palette.ink.main};

  &:active, &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.lightest};
  }

  &:active {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smoke.dark};
  }

  &:disabled {
    color: inherit;
    opacity: 0.5;
  }
}
`;

// Drawer backdrop close icon button.
export const CloseDrawerIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.common.white};
  left: calc(100% + 4px);
  position: absolute;
  top: 4px;
`;

// Socials icon button.
export const IconButtonSocials = styled(MIconButton)`
  color: ${({ theme }) => theme.palette.ink.light};

  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.light};
  }
` as typeof MIconButton;

// Socials icon button - footer component.
export const IconButtonSocialsFooter = styled(MIconButton)`
  color: ${({ theme }) => theme.palette.ink.light};

  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.main};
  }
` as typeof MIconButton;
