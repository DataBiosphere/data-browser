// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";

export const sideColumn: ComponentConfig[] = [
  {
    component: C.Text,
    transformer: () => ({
      children: "Side column. TBD",
    }),
  },
];
