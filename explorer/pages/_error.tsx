import { TempError as CustomError } from "@clevercanary/data-explorer-ui/lib/components/TempError";
import { NextPage, NextPageContext } from "next";

interface ErrorProps {
  error?: Error | null;
}

const Error: NextPage<ErrorProps> = ({ error }: ErrorProps) => {
  return error ? <CustomError error={error} /> : <></>;
};

Error.getInitialProps = ({ err }: NextPageContext): ErrorProps => {
  return { error: err };
};

export default Error;
