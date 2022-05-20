import React from "react";
import { Redirect } from "../app/components";
import { config } from "../app/config";

const HomePage = () => {
  const { redirectRootToPath } = config();

  if (redirectRootToPath) {
    return <Redirect destination={redirectRootToPath} replace />;
  }

  return <></>;
};

export default HomePage;
