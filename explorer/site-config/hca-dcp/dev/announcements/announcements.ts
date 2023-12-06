import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";

export const announcements: ComponentsConfig = [
  {
    component: C.SystemIndexing,
  } as ComponentConfig<typeof C.SystemIndexing>,
  {
    component: C.SystemStatus,
    props: {
      title:
        "One or more of the systems composing the HCA DCP are currently unavailable.",
    },
  } as ComponentConfig<typeof C.SystemStatus>,
];
