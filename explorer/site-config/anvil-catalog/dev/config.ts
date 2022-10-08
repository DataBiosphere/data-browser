import { SiteConfig } from "../../../app/config/common/entities";
import anvilDevConfig from "../../anvil/dev/config";
import { consortiaEntity } from "./index/consortiaEntity";
import { studiesEntity } from "./index/studiesEntity";
import { workspaceEntity } from "./index/workspaceEntity";

const config: SiteConfig = {
  ...anvilDevConfig,
  categoryConfigs: [
    {
      key: "consentCode",
      label: "Consent Code",
    },
    {
      key: "consortium",
      label: "Consortium",
    },
    {
      key: "dataTypes",
      label: "Data Type",
    },
    {
      key: "dbGapId",
      label: "dbGap Id",
    },
    {
      key: "diseases",
      label: "Disease (indication)",
    },
    {
      key: "studyDesigns",
      label: "Study Design",
    },
    {
      key: "workspaceName",
      label: "Terra Workspace Name",
    },
  ],
  disablePagination: true,
  entities: [workspaceEntity, studiesEntity, consortiaEntity],
  explorerTitle: "AnVIL Dataset Catalog",
  redirectRootToPath: "/workspaces",
  summaryConfig: undefined,
};

export default config;
