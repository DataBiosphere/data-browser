import { Error as ErrorComponent } from "@databiosphere/findable-ui/lib/components/Error/error";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { NextPage, NextPageContext } from "next";

interface ErrorProps {
  error?: Error | null;
}

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
