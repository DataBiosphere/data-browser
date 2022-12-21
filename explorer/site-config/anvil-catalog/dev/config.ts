import { SiteConfig } from "../../../app/config/common/entities";
import anvilDevConfig from "../../anvil/dev/config";
import { ANVIL_CATALOG_FILTER_CATEGORY_KEYS } from "../filter-category-keys";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";

const config: SiteConfig = {
  ...anvilDevConfig,
  categoryConfigs: [
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
      label: "Consent Code",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.CONSORTIUM,
      label: "Consortium",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DATA_TYPE,
      label: "Data Type",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
      label: "dbGap Id",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.DISEASE,
      label: "Disease (indication)",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_DESIGN,
      label: "Study Design",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.STUDY_NAME,
      label: "Study",
    },
    {
      key: ANVIL_CATALOG_FILTER_CATEGORY_KEYS.WORKSPACE_NAME,
      label: "Terra Workspace Name",
    },
  ],
  entities: [studiesEntityConfig, workspaceEntityConfig, consortiaEntityConfig],
  explorerTitle: "AnVIL Dataset Catalog",
  redirectRootToPath: "/studies",
  summaryConfig: undefined,
};

export default config;
