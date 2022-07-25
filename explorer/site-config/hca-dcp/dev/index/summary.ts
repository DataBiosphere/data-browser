// App dependencies
import * as C from "../../../../app/components";
import { ComponentConfig } from "app/config/model";
import * as T from "./summaryViewModelBuilder";
import { AzulSummaryResponse } from "../../../../app/apis/azul/common/entities";

export const summary = [
  {
    component: C.Summaries,
    transformer: T.buildSummaries,
  } as ComponentConfig<typeof C.Summaries, AzulSummaryResponse>,
];
