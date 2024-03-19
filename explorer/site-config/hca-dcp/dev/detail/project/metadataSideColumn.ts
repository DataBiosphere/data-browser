import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  getExportCurrentQueryAndDataSummary,
  getExportDataReleasePolicy,
} from "../../export/sideColumn";

export const sideColumn: ComponentConfig[] = [
  ...getExportCurrentQueryAndDataSummary(),
  ...getExportDataReleasePolicy(),
];
