import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

export const mainColumn = [
  /* mainColumn - top section - warning */
  {
    children: [
      {
        children: [
          {
            children: [
              {
                component: MDX.ExportWarning,
              } as ComponentConfig<typeof MDX.ExportWarning>,
            ],
            component: C.ConditionalComponent,
            viewBuilder: V.renderWhenUnAuthorized,
          } as ComponentConfig<typeof C.ConditionalComponent>,
        ],
        component: C.FluidAlert,
        viewBuilder: V.buildExportWarning,
      } as ComponentConfig<typeof C.FluidAlert>,
    ],
    component: C.BackPageContentSingleColumn,
  } as ComponentConfig<typeof C.BackPageContentSingleColumn>,
];
