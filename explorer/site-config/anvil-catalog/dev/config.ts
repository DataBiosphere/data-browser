import { SiteConfig } from "../../../app/config/model";
import anvilDevConfig from "../../anvil/dev/config";
import { workspaceEntity } from "./workspaceEntity";

const config: SiteConfig = {
  ...anvilDevConfig,
  entities: [workspaceEntity],
  redirectRootToPath: "/workspaces",
};

export default config;
