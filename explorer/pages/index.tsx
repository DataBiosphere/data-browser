import { Redirect } from "@databiosphere/findable-ui/lib/components/Redirect/redirect";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";

const HomePage = (): JSX.Element => {
  const { config } = useConfig();
  const { redirectRootToPath } = config;

  if (redirectRootToPath) {
    return <Redirect destination={redirectRootToPath} replace />;
  }

  return <></>;
};

export default HomePage;
