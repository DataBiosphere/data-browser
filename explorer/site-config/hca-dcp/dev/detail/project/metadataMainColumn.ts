import { ComponentConfig } from "app/config/common/entities";
import * as C from "../../../../../app/components";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    viewBuilder: () => ({
      text: ["To do."],
      title: "Metadata Download",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
