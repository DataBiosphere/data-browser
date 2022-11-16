import * as C from "app/components";
import { ComponentConfig } from "app/config/common/entities";
import { NCPICatalogStudy } from "../../../../../app/apis/catalog/ncpi-catalog/common/entities";
import * as T from "../../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";

export const mainColumn = [
  {
    component: C.Description,
    viewBuilder: T.buildStudyDescription,
  } as ComponentConfig<typeof C.Description, NCPICatalogStudy>,
  {
    children: [
      {
        children: [
          {
            component: C.Links,
            viewBuilder: T.buildStudyApplyingForAccess,
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
