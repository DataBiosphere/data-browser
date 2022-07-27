// App dependencies
import * as C from "../../../../../app/components";
import { ComponentConfig } from "app/config/common/entities";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    transformer: () => ({
      text: ["To do."],
      title: "Project Files via curl",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
