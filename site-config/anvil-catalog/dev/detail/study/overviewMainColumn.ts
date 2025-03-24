import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as V from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: C.Markdown,
        viewBuilder: V.buildStudyDescription,
      } as ComponentConfig<typeof C.Markdown, AnVILCatalogStudy>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Description",
    },
  } as ComponentConfig<typeof C.CollapsableSection, AnVILCatalogStudy>,
  {
    children: [
      {
        children: [
          {
            component: C.Links,
            viewBuilder: V.buildStudyApplyingForAccess,
          } as ComponentConfig<typeof C.Links, AnVILCatalogStudy>,
        ],
        component: C.Stack,
      } as ComponentConfig<typeof C.Stack, AnVILCatalogStudy>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: true,
      title: "Applying For Access",
    },
  } as ComponentConfig<typeof C.CollapsableSection, AnVILCatalogStudy>,
];
