import anvilDevConfig from "../../anvil/dev/config";
import { workspaceEntity } from "./index/workspaceEntity";
import { SiteConfig } from "../../../app/config/common/entities";

const config: SiteConfig = {
  ...anvilDevConfig,
  disablePagination: true,
  entities: [workspaceEntity],
  entityTitle: "Anvil Dataset Catalog",
  redirectRootToPath: "/workspaces",
  summaryConfig: undefined,
};

export default config;
