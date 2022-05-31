/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

import React from "react";
import { config } from "../../config/config";
import { Body } from "../Body/Body";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Page = ({ children }: PageProps) => {
  return (
    //FIXME: Styling will change when we decide about the approach we want to
    //   follow for this project
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header {...config().layout.header} />
      <Body>{children}</Body>
      <Footer>Footer</Footer>
    </div>
  );
};
