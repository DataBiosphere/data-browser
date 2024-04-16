import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Breadcrumbs } from "../../components/common/Content/components/Breadcrumbs/breadcrumbs.styles";
import { Link } from "../../components/common/Content/components/Link/link";
import { Figure } from "../../components/common/Figure/figure";
import { AnchorProps } from "./entities";
import { getContentScope } from "./scope";

export const CONTENT_FOLDER_NAME = "content";

export const MDX_COMPONENTS = {
  Breadcrumbs,
  Figure,
  Link,
  a: ({ children, href }: AnchorProps): JSX.Element =>
    Link({ label: children, url: href }),
};

export const MDX_SCOPE = { ...getContentScope(), ANCHOR_TARGET };
