/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Body } from "../Body/Body";
import { config } from "../../config/config";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/header";

// Styles
import { Container, Content } from "./page.styles";

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
