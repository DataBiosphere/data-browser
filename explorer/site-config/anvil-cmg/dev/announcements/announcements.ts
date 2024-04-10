import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";

export const announcements: ComponentsConfig = [
  {
    component: C.SessionTimeout,
  } as ComponentConfig<typeof C.SessionTimeout>,
  {
    children: [
      {
        component: MDX.BetaAnnouncement,
      } as ComponentConfig<typeof MDX.BetaAnnouncement>,
    ],
    component: C.Banner,
  } as ComponentConfig<typeof C.Banner>,
];
