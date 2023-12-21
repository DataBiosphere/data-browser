import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";

export const announcements: ComponentsConfig = [
  {
    component: C.SessionTimeout,
  } as ComponentConfig<typeof C.SessionTimeout>,
];
