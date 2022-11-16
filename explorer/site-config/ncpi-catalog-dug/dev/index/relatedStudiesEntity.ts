import { studiesEntityConfig } from "site-config/ncpi-catalog/dev/index/studiesEntityConfig";
import { DugVariableResponse } from "../../../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import * as C from "../../../../app/components";
import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
} from "../../../../app/config/common/entities";
import * as ViewBuilder from "../../../../app/viewModelBuilders/catalog/ncpi-catalog/common/viewModelBuilders";
import { DUG_API_PATH } from "../constants";

/**
 * Entity config object responsible for config related to the /explore/studies route.
 */
export const relatedStudiesEntity: EntityConfig<DugVariableResponse> = {
  apiPath: DUG_API_PATH,
  detail: studiesEntityConfig.detail,
  label: "Related Studies",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Cell,
          viewBuilder: ViewBuilder.buildDbGapId,
        } as ComponentConfig<typeof C.Cell>,
        header: "dbGap Id",
        sort: {
          sortKey: "phsId", // TODO Validate this is correct
        },
        width: { max: "1fr", min: "120px" },
      },
    ],
  } as ListConfig<DugVariableResponse>,
  options: { method: "POST" },
  route: "related",
  staticLoad: false,
};
