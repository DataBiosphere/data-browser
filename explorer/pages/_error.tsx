import { Error as ErrorComponent } from "@clevercanary/data-explorer-ui/lib/components/Error/error";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
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
