import { useConfig } from "app/hooks/useConfig";
import React from "react";
import { Redirect } from "../app/components/Redirect/Redirect";

const HomePage = (): JSX.Element => {
  const { redirectRootToPath } = useConfig();

  if (redirectRootToPath) {
    return <Redirect destination={redirectRootToPath} replace />;
  }

  return <></>;
};

export default HomePage;
