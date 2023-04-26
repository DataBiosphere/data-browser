import { Error as CustomError } from "@clevercanary/data-explorer-ui/lib/components/Error/error";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";

export default function Error(): JSX.Element {
  const { config } = useConfig();
  return <CustomError rootPath={config.redirectRootToPath} />;
}
