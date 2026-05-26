import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

/**
 * Returns export related current query and selected data summary configuration.
 * @returns export related side column configuration.
 */
export function getExportCurrentQueryAndDataSummary(): ComponentConfig[] {
  return [
    {
      children: [
        {
          component: C.ExportCurrentQuery,
          viewBuilder: V.buildExportCurrentQuery,
        } as ComponentConfig<typeof C.ExportCurrentQuery>,
        {
          component: C.ExportSelectedDataSummary,
          viewBuilder: V.buildExportSelectedDataSummary,
        } as ComponentConfig<typeof C.ExportSelectedDataSummary>,
      ],
      component: C.ExportSummary,
    } as ComponentConfig<typeof C.ExportSummary>,
  ];
}

/**
 * Returns export related data release policy configuration.
 * @returns export related data release policy configuration.
 */
export function getExportDataReleasePolicy(): ComponentConfig[] {
  return [
    {
      children: [
        {
          children: [
            {
              component: MDX.DataReleasePolicy,
            } as ComponentConfig<typeof MDX.DataReleasePolicy>,
          ],
          component: MDX.Section,
        } as ComponentConfig<typeof MDX.Section>,
      ],
      component: C.FluidPaper,
    } as ComponentConfig<typeof C.FluidPaper>,
  ];
}
