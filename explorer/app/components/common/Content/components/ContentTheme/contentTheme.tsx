import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";

export interface ContentThemeProps {
  children: ReactNode;
}

export const ContentTheme = ({ children }: ContentThemeProps): JSX.Element => {
  const { config } = useConfig();
  const appTheme = useTheme();
  const themeOptions = config.contentThemeOptionsFn?.(appTheme);
  return (
    <ThemeProvider theme={createTheme(appTheme, { ...themeOptions })}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
