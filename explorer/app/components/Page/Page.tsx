/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

import React from "react";
import { Body } from "../Body";
import { Footer } from "../Footer";
import { Header, HeaderProps } from "../Header";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
  header: HeaderProps;
}

export const Page = ({ children, header }: PageProps) => {
  return (
    //FIXME: Styling will change when we decide about the approach we want to
    //   follow for this project
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header {...header} />
      <Body>{children}</Body>
      <Footer>Footer</Footer>
    </div>
  );
};
