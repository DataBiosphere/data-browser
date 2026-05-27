import { SiteConfig } from "../../../common/entities";
import { filesEntityConfig } from "./files/filesEntityConfig";
import { projectsEntityConfig } from "./projects/projectsEntityConfig";
import { samplesEntityConfig } from "./samples/samplesEntityConfig";

export const ENTITIES: SiteConfig["entities"] = [
  projectsEntityConfig,
  samplesEntityConfig,
  filesEntityConfig,
];
