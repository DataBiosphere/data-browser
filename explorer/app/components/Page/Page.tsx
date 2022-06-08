/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

import React from "react";
import { config } from "../../config/config";
import { Body } from "../Body/Body";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Container, Content } from "./Page.styles";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Page = ({ children }: PageProps): JSX.Element => {
  return (
    <Container>
      <Header {...config().layout.header} />
      <Content>
        <Body>{children}</Body>
        <Footer>Footer</Footer>
      </Content>
    </Container>
  );
};
