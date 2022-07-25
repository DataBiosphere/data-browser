// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { Main as MainView } from "./main.styles";

interface Props {
  children: ReactNode | ReactNode[];
}

export const Main = ({ children }: Props): JSX.Element => {
  return <MainView>{children}</MainView>;
};
