import { SiteConfig } from "../../../app/config/model";
import anvilDevConfig from "../../anvil/dev/config";
import { workspaceEntity } from "./workspaceEntity";

const config: SiteConfig = {
  ...anvilDevConfig,
  entities: [workspaceEntity],
  entityTitle: "Anvil Dataset Catalog",
  redirectRootToPath: "/workspaces",
  summary: {
    apiPath: "",
    components: [],
  },
};

export default config;
