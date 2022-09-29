import { SiteConfig } from "../../../app/config/common/entities";
import anvilDevConfig from "../../anvil/dev/config";
import { SOURCE_FIELD_KEY } from "../tsv-config";
import { workspaceEntity } from "./index/workspaceEntity";

const config: SiteConfig = {
  ...anvilDevConfig,
  categoryConfigs: [
    {
      key: SOURCE_FIELD_KEY.CONSORTIUM,
      label: "Consortium",
    },
    {
      key: SOURCE_FIELD_KEY.DB_GAP_ID,
      label: "dbGap Id",
    },
    {
      key: SOURCE_FIELD_KEY.DATA_USE_RESTRICTION,
      label: "Consent Code",
    },
    {
      key: SOURCE_FIELD_KEY.WORKSPACE_NAME,
      label: "Terra Workspace Name",
    },
    {
      key: SOURCE_FIELD_KEY.DISEASES,
      label: "Disease (indication)",
    },
    {
      key: SOURCE_FIELD_KEY.DATA_TYPES,
      label: "Data Type",
    },
    {
      key: SOURCE_FIELD_KEY.STUDY_DESIGNS,
      label: "Study Design",
    },
  ],
  disablePagination: true,
  entities: [workspaceEntity],
  explorerTitle: "AnVIL Dataset Catalog",
  redirectRootToPath: "/workspaces",
  summaryConfig: undefined,
};

export default config;
