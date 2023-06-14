import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";
import { FileLocation } from "@clevercanary/data-explorer-ui/lib/hooks/useRequestFileLocation";

/**
 * Returns the download curl command for the generated manifest.
 * @param fileLocation - Request file location.
 * @returns curl command.
 */
export const useDownloadEntityCurlCommand = (
  fileLocation?: FileLocation
): string | undefined => {
  const { executionEnvironment } = useDetailState();
  const { commandLine } = fileLocation || {};

  if (!commandLine || !executionEnvironment) {
    return;
  }

  return commandLine[executionEnvironment];
};
