import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import React from "react";

/**
 * This component is just using MUIs tooltip and wrapping the children components into a div.
 * This is necessary because Tooltips created from ComponentCreator, using React.createElement API, doesn't accept refs.
 * https://mui.com/material-ui/guides/composition/#caveat-with-refs
 * @param muiTooltipProps - Set of props accepted by MUI tooltip.
 * @param muiTooltipProps.children - Content to display in tooltip.
 * @param muiTooltipProps.rest - Tooltip props other than children.
 * @returns Tooltip element for display.
 */
export const Tooltip = ({
  children,
  ...rest
}: MuiTooltipProps): JSX.Element => {
  return (
    <MuiTooltip {...rest}>
      <div>{children}</div>
    </MuiTooltip>
  );
};
