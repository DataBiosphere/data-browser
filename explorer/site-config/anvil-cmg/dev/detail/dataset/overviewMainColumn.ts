import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import { Description } from "../../../../../app/components/Detail/components/MDX/components/Description/description";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn = [
  {
    component: Description,
    viewBuilder: V.buildDatasetDescription,
  } as ComponentConfig<typeof Description, DatasetsResponse>,
];
