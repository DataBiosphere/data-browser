import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { DatasetsResponse } from "../../../../../../../../apis/azul/anvil-cmg/common/responses";

export interface Props {
  viewContext: ViewContext<DatasetsResponse>;
}
