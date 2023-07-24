import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.DownloadCurlCommand,
    viewBuilder: V.buildDownloadEntityCurlCommand,
  } as ComponentConfig<typeof C.DownloadCurlCommand, ProjectsResponse>,
];
