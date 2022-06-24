import { ComponentConfig } from "app/config/model";
import * as C from "../../../app/components";
import * as T from "./summaryViewModelBuilder";

export const summary = [
  {
    component: C.Stack,
    props: {
      direction: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    children: [
      {
        component: C.Text,
        transformer: T.title,
      } as ComponentConfig<typeof C.Text>,
      {
        component: C.Stack,
        props: {
          direction: "row",
          gap: 2,
        },
        children: [
          {
            component: C.ValueInline,
            transformer: T.summaryToEstimatedCells,
          } as ComponentConfig<typeof C.ValueInline>,
          {
            component: C.ValueInline,
            transformer: T.summaryToSpecimens,
          } as ComponentConfig<typeof C.ValueInline>,
          {
            component: C.ValueInline,
            transformer: T.summaryToDonors,
          } as ComponentConfig<typeof C.ValueInline>,
          {
            component: C.ValueInline,
            transformer: T.summaryToFiles,
          } as ComponentConfig<typeof C.ValueInline>,
        ],
      } as ComponentConfig<typeof C.Stack>,
    ],
  } as ComponentConfig<typeof C.Stack>,
];
