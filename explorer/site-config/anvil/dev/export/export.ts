import {
  ComponentConfig,
  ExportConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";

export const exportConfig: ExportConfig = {
  exportMethods: [],
  staticLoad: true,
  tabs: [
    {
      label: "Choose Export Method",
      mainColumn: [],
      route: "/export",
      sideColumn: [],
    },
  ],
  top: [
    {
      component: C.BackPageHero,
      props: {
        title: "Choose Export Method",
      },
    } as ComponentConfig<typeof C.BackPageHero>,
  ],
};
