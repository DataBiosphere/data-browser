import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as V from "./summaryViewModelBuilder";

export const summary = [
  {
    component: C.Summaries,
    viewBuilder: V.buildSummaries,
  } as ComponentConfig<typeof C.Summaries, AzulSummaryResponse>,
];
