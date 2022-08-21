import { ExportToTerra } from "app/components/Export/components/ExportToTerra/exportToTerra";
import { useConfig } from "app/hooks/useConfig";
import React from "react";
import {
  AZUL_PARAM,
  EXPORT_TO_TERRA_FORMAT,
  EXPORT_TO_TERRA_PARAM,
} from "../../apis/azul/common/constants";

export const MainColumn = (): JSX.Element => {
  const config = useConfig();
  const { dataSource, exportToTerraUrl } = config;
  if (!exportToTerraUrl) {
    console.error(`"exportToTerraUrl" not specified in config`);
    return <></>;
  }
  const catalog = dataSource?.defaultListParams?.[AZUL_PARAM.CATALOG];
  if (!catalog) {
    console.error(`"defaultListParams" or "catalog" not specified in config`);
    return <></>;
  }

  const requestParams: URLSearchParams = new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [EXPORT_TO_TERRA_PARAM.FORMAT]: EXPORT_TO_TERRA_FORMAT.PFB,
  });
  const exportUrl = config.dataSource.url + "fetch/manifest/files";

  return (
    <ExportToTerra
      exportTerraUrl={exportToTerraUrl}
      url={exportUrl}
      params={requestParams}
    />
  );
};
