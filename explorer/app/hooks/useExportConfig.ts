// App dependencies
import { BackPageConfig } from "../config/common/entities";
import { useConfig } from "app/hooks/useConfig";

/**
 * Hook to get the export config
 * @returns @see BackPageConfig used on the export field for the current config.
 */
export const useExportConfig = (): BackPageConfig => {
  const config = useConfig();

  if (!config.export) {
    throw new Error(`This config does not have an export field set`);
  }

  return config.export;
};
