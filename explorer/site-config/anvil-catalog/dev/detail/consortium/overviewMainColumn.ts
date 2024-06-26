import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { AnVILCatalogConsortium } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../../app/components/index";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: C.ConsortiumDescription,
        viewBuilder: V.buildConsortiumOverview,
      } as ComponentConfig<
        typeof C.ConsortiumDescription,
        AnVILCatalogConsortium
      >,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Description",
    },
  } as ComponentConfig<typeof C.CollapsableSection, AnVILCatalogConsortium>,
];
