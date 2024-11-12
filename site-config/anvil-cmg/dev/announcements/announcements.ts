import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/anvil-cmg";

export const announcements: ComponentsConfig = [
  {
    component: C.Announcements,
    props: {
      generalAnnouncement: MDX.AlertBetaAnnouncement({}),
    },
  } as ComponentConfig<typeof C.Announcements>,
];
