import {
  ComponentConfig,
  ComponentsConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";
import { BetaAnnouncement } from "../../../../app/components/common/Banner/components/Announcements/components/BetaAnnouncement/betaAnnouncement";

export const announcements: ComponentsConfig = [
  {
    component: C.Announcements,
    props: {
      GeneralAnnouncement: BetaAnnouncement,
    },
  } as ComponentConfig<typeof C.Announcements>,
];
