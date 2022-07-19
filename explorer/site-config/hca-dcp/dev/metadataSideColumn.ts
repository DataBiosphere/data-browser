// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";

export const sideColumn: ComponentConfig[] = [
  {
    component: C.TitledText,
    transformer: () => ({
      text: [
        "Downloaded data is governed by the HCA Data Release Policy and licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). For more information please see our Data Use Agreement.",
      ],
    }),
  } as ComponentConfig<typeof C.TitledText>,
];
