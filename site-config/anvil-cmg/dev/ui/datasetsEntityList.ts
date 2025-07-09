import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";
import * as V from "../../../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

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
  } as ComponentConfig<typeof C.ConditionalComponent, DatasetsResponse>,
];
