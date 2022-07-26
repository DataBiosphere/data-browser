// App dependencies
import * as C from "../../../../../app/components";
import { ComponentConfig } from "app/config/model";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    transformer: () => ({
      text: ["To do."],
      title: "DCP Generated Matrices",
    }),
  } as ComponentConfig<typeof C.TitledText>,
  {
    component: C.TitledText,
    transformer: () => ({
      text: ["To do."],
      title: "Contributor Generated Matrices and Analysis Files",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
