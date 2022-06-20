import React from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";

/**
 *
 * This component is just using MUIs tooltip and wrapping the children components into a div.
 * This is necessary because Tooltips created from ComponentCreator, using React.createElement API, doesn't accept refs.
 * https://mui.com/material-ui/guides/composition/#caveat-with-refs
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
