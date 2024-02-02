import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Breadcrumbs } from "../../components/common/Content/components/Breadcrumbs/breadcrumbs.styles";
import { Link } from "../../components/common/Content/components/Link/link.styles";
import { Figure } from "../../components/common/Figure/figure";
import { getContentScope } from "./scope";

export const CONTENT_FOLDER_NAME = "content";

export const MDX_COMPONENTS = { Breadcrumbs, Figure, Link };

export const MDX_SCOPE = { ...getContentScope(), ANCHOR_TARGET };
