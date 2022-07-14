// App dependencies
import * as C from "../../../../app/components";
import { ComponentConfig } from "app/config/model";
import { SummaryResponse } from "../../../../app/models/responses";
import * as T from "./summaryViewModelBuilder";

export const summary = [
  {
    component: C.Summaries,
    transformer: T.buildSummaries,
  } as ComponentConfig<typeof C.Summaries, SummaryResponse>,
];
