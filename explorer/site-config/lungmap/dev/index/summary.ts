import { AzulSummaryResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as Components from "../../../../app/components";
import * as ViewBuilder from "./summaryViewModelBuilder";

export const summary = [
  {
    component: Components.Summaries,
    viewBuilder: ViewBuilder.buildSummaries,
  } as ComponentConfig<typeof Components.Summaries, AzulSummaryResponse>,
];
