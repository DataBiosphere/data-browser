// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    transformer: () => ({
      text: ["To do."],
      title: "Metadata Download",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
