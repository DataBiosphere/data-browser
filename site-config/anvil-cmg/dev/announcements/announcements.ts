import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import { RAS } from "../../../../app/components/anvil/banner/RAS/ras";

export const announcements: ComponentsConfig = [
  {
    component: C.Announcements,
    props: { generalAnnouncement: RAS() },
  } as ComponentConfig<typeof C.Announcements>,
];
