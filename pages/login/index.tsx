import { LoginView } from "@databiosphere/findable-ui/lib/views/LoginView/loginView";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { pageTitle: "Login" },
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
