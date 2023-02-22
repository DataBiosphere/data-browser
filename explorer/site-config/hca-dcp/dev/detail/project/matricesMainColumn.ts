import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    viewBuilder: () => ({
      text: ["To do."],
      title: "DCP Generated Matrices",
    }),
  } as ComponentConfig<typeof C.TitledText>,
  {
    component: C.TitledText,
    viewBuilder: () => ({
      text: ["To do."],
      title: "Contributor Generated Matrices and Analysis Files",
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
