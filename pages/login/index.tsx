import { LoginView } from "@databiosphere/findable-ui/lib/views/LoginView/loginView";
import { GetStaticProps } from "next";
import { JSX } from "react";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageDescription: "Sign in to access protected data and features.",
      pageTitle: "Login",
    },
  };
};

/**
 * Login page.
 * @returns Login page view.
 */
const LoginPage = (): JSX.Element => {
  return <LoginView />;
};

export default LoginPage;
