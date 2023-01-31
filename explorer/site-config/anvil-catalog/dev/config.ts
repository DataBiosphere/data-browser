import { SiteConfig } from "../../../app/config/common/entities";
import anvilDevConfig from "../../anvil/dev/config";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../category";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";

const config: SiteConfig = {
  ...anvilDevConfig,
  categoryConfigs: [
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
      label: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
      label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
      label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
      label: "Terra Workspace Name", // TODO review label here and elsewhere
    },
  ],
  entities: [studiesEntityConfig, workspaceEntityConfig, consortiaEntityConfig],
  explorerTitle: "AnVIL Dataset Catalog",
  redirectRootToPath: "/studies",
  summaryConfig: undefined,
};

export default config;
