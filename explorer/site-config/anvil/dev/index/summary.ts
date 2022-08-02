// App dependencies
import * as Components from "../../../../app/components";
import { ComponentConfig } from "app/config/common/entities";
import * as ViewBuilder from "./summaryViewModelBuilder";
import { AzulSummaryResponse } from "../../../../app/apis/azul/common/entities";

export const summary = [
  {
    component: Components.Summaries,
    viewBuilder: ViewBuilder.buildSummaries,
  } as ComponentConfig<typeof Components.Summaries, AzulSummaryResponse>,
];
