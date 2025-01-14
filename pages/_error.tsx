import { Error as ErrorComponent } from "@databiosphere/findable-ui/lib/components/Error/error";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { NextPage, NextPageContext } from "next";

interface ErrorProps {
  error?: Error | null;
}

const MyError: NextPage<ErrorProps> = ({ error }: ErrorProps) => {
  const { config } = useConfig();

  return error ? (
    <ErrorComponent rootPath={config.redirectRootToPath} />
  ) : (
    <></>
  );
};

MyError.getInitialProps = ({ err }: NextPageContext): ErrorProps => {
  return { error: err };
};

export default MyError;
