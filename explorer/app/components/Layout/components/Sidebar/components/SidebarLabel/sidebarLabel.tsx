// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

// Styles
import { SidebarLabel as Label } from "./sidebarLabel.styles";

interface Props {
  label: string;
}

export const SidebarLabel = ({ label }: Props): JSX.Element => {
  return (
    <Label>
      <Typography variant="text-body-large-500">{label}</Typography>
    </Label>
  );
};
