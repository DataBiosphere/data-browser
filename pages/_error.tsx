import { Error as ErrorComponent } from "@databiosphere/findable-ui/lib/components/Error/error";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { NextPage, NextPageContext } from "next";

interface ErrorProps {
  error?: Error | null;
}

// eslint-disable-next-line sonarjs/no-globals-shadowing -- TODO not sure of reason for this
const Error: NextPage<ErrorProps> = ({ error }: ErrorProps) => {
  const { config } = useConfig();

  return error ? (
    <ErrorComponent rootPath={config.redirectRootToPath} />
  ) : (
    <></>
  );
};

Error.getInitialProps = ({ err }: NextPageContext): ErrorProps => {
  return { error: err };
};

export default Error;
