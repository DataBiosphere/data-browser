import { SiteConfig } from "../../../app/config/common/entities";
import anvilDevConfig from "../../anvil/dev/config";
import { workspaceEntity } from "./index/workspaceEntity";

const config: SiteConfig = {
  ...anvilDevConfig,
  categoryConfigs: [
    {
      key: "consortium",
      label: "Consortium",
    },
    {
      key: "name",
      label: "Terra Workspace Name",
    },
    {
      key: "library:indication",
      label: "Disease (indication)",
    },
    {
      key: "library:datatype",
      label: "Data Type",
    },
    {
      key: "library:studyDesign",
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
