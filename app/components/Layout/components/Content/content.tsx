import { JSX, ReactNode } from "react";
import { Content as MDXContent } from "./content.styles";

export interface ContentProps {
  children: ReactNode | ReactNode[];
}

export const Content = ({ children }: ContentProps): JSX.Element => {
  return <MDXContent>{children}</MDXContent>;
};
