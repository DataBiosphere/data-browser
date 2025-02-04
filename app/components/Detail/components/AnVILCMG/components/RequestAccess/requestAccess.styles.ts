import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { primaryDark } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import { DropdownMenu } from "@databiosphere/findable-ui/lib/components/common/DropdownMenu/dropdownMenu";

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

  ${(props) =>
    props.open &&
    css`
      background-color: ${primaryDark(props)};
    `}
`;
