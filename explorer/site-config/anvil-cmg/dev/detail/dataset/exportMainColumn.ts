import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.ExportEntityToTerra,
    viewBuilder: V.buildExportEntityToTerra,
  } as ComponentConfig<typeof C.ExportEntityToTerra, DatasetsResponse>,
];
