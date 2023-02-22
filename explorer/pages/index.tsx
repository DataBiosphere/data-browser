import { Redirect } from "@clevercanary/data-explorer-ui/lib/components/Redirect/redirect";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import React from "react";

const HomePage = (): JSX.Element => {
  const { config } = useConfig();
  const { redirectRootToPath } = config;

  if (redirectRootToPath) {
    return <Redirect destination={redirectRootToPath} replace />;
  }

  return <></>;
};

export default HomePage;
