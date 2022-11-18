import * as C from "app/components";
import { ComponentConfig } from "app/config/common/entities";
import { AnVILCatalogStudy } from "../../../../../app/apis/catalog/anvil-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/anvil-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: C.Markdown,
        viewBuilder: T.buildStudyDescription,
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
            viewBuilder: T.buildStudyApplyingForAccess,
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
