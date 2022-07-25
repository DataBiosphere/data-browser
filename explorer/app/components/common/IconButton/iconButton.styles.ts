import styled from "@emotion/styled";
import { IconButton } from "./iconButton";

// Secondary icon button.
export const IconButtonSecondary = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark},
  0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.palette.ink};

  &:active, &:hover {
    background-color: ${({ theme }) => theme.palette.smokeLightest};
  }

  &:active {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark};
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
