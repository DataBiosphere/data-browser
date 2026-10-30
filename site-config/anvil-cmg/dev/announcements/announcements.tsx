import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import { RASRecertification } from "../../../../app/components/anvil/banner/RASRecertification/rasRecertification";

export const announcements: ComponentsConfig = [
  {
    component: C.Announcements,
    props: { generalAnnouncement: <RASRecertification /> },
  } as ComponentConfig<typeof C.Announcements>,
];
