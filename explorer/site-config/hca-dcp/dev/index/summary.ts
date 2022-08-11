import { ComponentConfig } from "app/config/common/entities";
import { AzulSummaryResponse } from "../../../../app/apis/azul/common/entities";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "./summaryViewModelBuilder";

export const summary = [
  {
    component: Components.Summaries,
    viewBuilder: ViewBuilder.buildSummaries,
  } as ComponentConfig<typeof Components.Summaries, AzulSummaryResponse>,
];
