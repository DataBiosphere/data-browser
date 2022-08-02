// App dependencies
import * as C from "../../../../../app/components";
import { ComponentConfig } from "app/config/common/entities";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    viewBuilder: () => ({
      text: ["To do."],
      title: "Metadata Download",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
