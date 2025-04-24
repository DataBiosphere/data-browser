import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { DropdownMenu } from "@databiosphere/findable-ui/lib/components/common/DropdownMenu/dropdownMenu";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

interface Props {
  open?: boolean;
}

export const StyledDropdownMenu = styled(DropdownMenu)`
  .MuiPaper-menu {
    max-width: 324px;

    .MuiListItemText-root {
      display: grid;
      gap: 4px;
      white-space: normal;
    }
  }
`;

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  padding-right: 8px;

  .MuiButton-endIcon {
    margin-left: -6px;
  }

  ${({ open }) =>
    open &&
    css`
      background-color: ${PALETTE.PRIMARY_DARK};
    `}
`;
