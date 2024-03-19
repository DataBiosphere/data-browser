import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { getExportCurrentQueryAndDataSummary } from "../../../../hca-dcp/dev/export/sideColumn";
import { getExportDataReleasePolicy } from "../../export/sideColumn";

export const sideColumn: ComponentConfig[] = [
  ...getExportCurrentQueryAndDataSummary(),
  ...getExportDataReleasePolicy(),
];
