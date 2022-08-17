import { ExportToTerra } from "app/components/Export/components/ExportToTerra/exportToTerra";
import { useConfig } from "app/hooks/useConfig";
import React from "react";

export const MainColumn = (): JSX.Element => {
  const config = useConfig();
  const requestParams: URLSearchParams = new URLSearchParams({
    format: "terra.pfb",
  });
  const exportUrl = config.dataSource.url + "fetch/manifest/files";

  return <ExportToTerra url={exportUrl} params={requestParams} />;
};
