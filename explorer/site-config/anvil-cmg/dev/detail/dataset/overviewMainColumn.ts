import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { DatasetsResponse } from "../../../../../app/apis/azul/anvil-cmg/common/responses";
import * as V from "../../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: C.Markdown,
        viewBuilder: V.buildDatasetDescription,
      } as ComponentConfig<typeof C.Markdown, DatasetsResponse>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Description",
    },
  } as ComponentConfig<typeof C.CollapsableSection, DatasetsResponse>,
];
