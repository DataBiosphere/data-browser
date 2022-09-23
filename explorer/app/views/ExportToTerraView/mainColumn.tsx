import { ExportToTerra } from "app/components/Export/components/ExportToTerra/exportToTerra";
import { useConfig } from "app/hooks/useConfig";
import React, { useContext } from "react";
import {
  AZUL_PARAM,
  EXPORT_TO_TERRA_FORMAT,
  EXPORT_TO_TERRA_PARAM,
} from "../../apis/azul/common/constants";
import { transformFilters } from "../../apis/azul/common/filterTransformer";
import { ExploreStateContext } from "../../common/context/exploreState";

export const MainColumn = (): JSX.Element => {
  // Grab the filter context; use this to keep selected filter state up-to-date.
  const { exploreState } = useContext(ExploreStateContext);
  const { filterState } = exploreState;

  // Grab configuration and check expected values are set. TODO(cc) add discriminating unions to config so checks aren't necessary.
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

  // Build request params.
  const requestParams: URLSearchParams = new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [EXPORT_TO_TERRA_PARAM.FORMAT]: EXPORT_TO_TERRA_FORMAT.PFB,
  });

  // Add filters to request params, if any.
  const filtersParam = transformFilters(filterState);
  if (filtersParam) {
    requestParams.append(AZUL_PARAM.FILTERS, filtersParam);
  }

  // Build export URL TODO(cc) add to Azul utils
  const exportUrl = config.dataSource.url + "fetch/manifest/files";

  return (
    <ExportToTerra
      exportTerraUrl={exportToTerraUrl}
      url={exportUrl}
      params={requestParams}
    />
  );
};
