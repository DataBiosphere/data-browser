import { Box } from "@mui/material";
import React from "react";

interface StackProps {
  children: React.ReactNode;
  gap?: number;
  border?: boolean;
}

export const Stack = ({ children, gap, border }: StackProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={(theme) => (gap ? theme.spacing(gap) : 0)}
      sx={(theme) => ({
        "& > *:not(:last-child)": {
          borderBottom: border ? `1px solid ${theme.palette.smoke}` : "none",
        },
      })}
    >
      {children}
    </Box>
  );
};
