// Core dependencies
import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  Tag: ReactElement;
  TooltipTitle: ReactElement;
}

export const NTag = ({ Tag, TooltipTitle }: Props): JSX.Element => {
  return (
    <Tooltip arrow placement="top" title={TooltipTitle}>
      {Tag}
    </Tooltip>
  );
};
