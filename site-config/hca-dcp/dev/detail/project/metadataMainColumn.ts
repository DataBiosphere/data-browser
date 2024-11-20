import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.ManifestDownloadEntity,
    viewBuilder: V.buildManifestDownloadEntity,
  } as ComponentConfig<typeof C.ManifestDownloadEntity, ProjectsResponse>,
];
