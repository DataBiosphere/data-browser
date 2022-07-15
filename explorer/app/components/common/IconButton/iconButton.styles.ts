import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

// Secondary icon button.
export const IconButtonSecondary = styled(IconButton)`
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark},
  0px 1px 0px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.palette.ink};

  &:active {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.smokeDark};
  }

  &:disabled {
    color: inherit;
    opacity: 0.5;
  }
}
`;
