import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { NCPICatalogStudy } from "../../../../../app/apis/catalog/ncpi-catalog/common/entities";
import * as V from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    children: [
      {
        component: C.Markdown,
        viewBuilder: V.buildStudyDescription,
      } as ComponentConfig<typeof C.Markdown, NCPICatalogStudy>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Description",
    },
  } as ComponentConfig<typeof C.CollapsableSection, NCPICatalogStudy>,
  {
    children: [
      {
        children: [
          {
            component: C.Links,
            viewBuilder: V.buildStudyApplyingForAccess,
          } as ComponentConfig<typeof C.Links, NCPICatalogStudy>,
        ],
        component: C.Stack,
      } as ComponentConfig<typeof C.Stack, NCPICatalogStudy>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: true,
      title: "Applying For Access",
    },
  } as ComponentConfig<typeof C.CollapsableSection, NCPICatalogStudy>,
];
