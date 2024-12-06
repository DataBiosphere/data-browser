import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../components";
import { Figure } from "../../components/common/Figure/figure";
import { Link } from "../../components/Layout/components/Content/components/Link/link";

export const CONTENT_FOLDER_NAME = "content";

export const MDX_COMPONENTS = {
  Alert: C.Alert,
  AlertTitle: C.AlertTitle,
  Breadcrumbs: C.Breadcrumbs,
  Figure,
  a: Link,
};

export const MDX_SCOPE = { ANCHOR_TARGET };
