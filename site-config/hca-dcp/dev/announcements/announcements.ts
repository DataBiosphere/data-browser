import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";

export const announcements: ComponentsConfig = [
  {
    component: C.SystemIndexing,
    props: {
      content:
        "Data indexing in progress. Downloads and exports are disabled as search results may be incomplete.",
    },
  } as ComponentConfig<typeof C.SystemIndexing>,
  {
    component: C.SystemStatus,
    props: {
      content:
        "One or more of the systems composing the HCA DCP are currently unavailable.",
    },
  } as ComponentConfig<typeof C.SystemStatus>,
];
