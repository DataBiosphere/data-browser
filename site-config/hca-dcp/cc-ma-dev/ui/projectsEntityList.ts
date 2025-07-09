import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const entityListSlot: ComponentsConfig = [
  {
    children: [
      {
        component: MDX.AlertLoginReminder,
        props: {
          ...ALERT_PROPS.STANDARD_WARNING,
          component: C.FluidPaper,
        },
      } as ComponentConfig<typeof MDX.AlertLoginReminder>,
    ],
    component: C.ConditionalComponent,
    viewBuilder: V.renderWhenUnAuthenticated,
  } as ComponentConfig<typeof C.ConditionalComponent, ProjectsResponse>,
];
