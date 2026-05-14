import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import { EXPORT_ACCESS_WARNING } from "./accessWarning";
import {
  getExportCurrentQueryAndDataSummary,
  getExportDataReleasePolicy,
} from "./sideColumn";

/**
 * Returns the managed access export method main column: an access warning row,
 * the given main column wrapped in BackPageContentMainColumn, and the shared
 * side column content (current query, data summary, and data release policy)
 * wrapped in BackPageContentSideColumn.
 * @param mainColumn - Main column content to render under the access warning.
 * @returns Managed access export method main column.
 */
export function getExportMethodMainColumn(
  mainColumn: ComponentConfig[]
): ComponentConfig[] {
  return [
    EXPORT_ACCESS_WARNING,
    {
      children: mainColumn,
      component: C.BackPageContentMainColumn,
    } as ComponentConfig<typeof C.BackPageContentMainColumn>,
    {
      children: [
        ...getExportCurrentQueryAndDataSummary(),
        ...getExportDataReleasePolicy(),
      ],
      component: C.BackPageContentSideColumn,
    } as ComponentConfig<typeof C.BackPageContentSideColumn>,
  ];
}
