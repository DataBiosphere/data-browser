// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";

export const mainColumn: ComponentConfig[] = [
  {
    component: C.Text,
    transformer: () => ({
      children: "Main column. TBD",
      customColor: "ink",
      variant: "text-body-400-2lines",
    }),
  } as ComponentConfig<typeof C.Text>,
];
