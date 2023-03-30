import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components/index";
import * as MDX from "../../../../../app/content/anvil-catalog";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: MDX.RenderComponent,
        viewBuilder: V.buildConsortiumOverview,
      } as ComponentConfig<typeof MDX.RenderComponent>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Description",
    },
  } as ComponentConfig<typeof C.CollapsableSection, AnVILCatalogConsortium>,
];
