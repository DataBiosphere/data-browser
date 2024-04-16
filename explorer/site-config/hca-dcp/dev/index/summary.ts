import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "./summaryViewModelBuilder";

export const summary = [
  {
    component: Components.Summaries,
    viewBuilder: ViewBuilder.buildSummaries,
  } as ComponentConfig<typeof Components.Summaries, AzulSummaryResponse>,
];
