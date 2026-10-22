import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

interface Props {
  open?: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<Props>`
  padding-right: 8px;

  .MuiButton-endIcon {
    margin-left: -6px;
    margin-right: 0;
  }

  ${({ open }) =>
    open &&
    css`
      background-color: ${PALETTE.PRIMARY_DARK};
    `}
`;
