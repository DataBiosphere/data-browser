import anvilDevConfig from "../../anvil/dev/config";
import { workspaceEntity } from "./workspaceEntity";
import { SiteConfig } from "../../../app/config/common/entities";

const config: SiteConfig = {
  ...anvilDevConfig,
  disablePagination: true,
  entities: [workspaceEntity],
  entityTitle: "Anvil Dataset Catalog",
  redirectRootToPath: "/workspaces",
  summary: {
    apiPath: "",
    components: [],
  },
};

export default config;
