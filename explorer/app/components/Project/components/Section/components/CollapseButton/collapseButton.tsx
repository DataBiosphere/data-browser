// Core dependencies
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import React from "react";

interface Props {
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const CollapseButton = ({
  expanded,
  onToggleExpanded,
}: Props): JSX.Element => {
  return (
    <IconButton color="ink" edge="end" onClick={onToggleExpanded} size="xsmall">
      {expanded ? (
        <RemoveIcon fontSize="small" />
      ) : (
        <AddIcon fontSize="small" />
      )}
    </IconButton>
  );
};
