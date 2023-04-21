import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { Error as CustomError } from "../app/components/Error/error";

export default function Error(): JSX.Element {
  const { config } = useConfig();
  return <CustomError rootPath={config.redirectRootToPath} />;
}
