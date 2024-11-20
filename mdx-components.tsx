import { MDXComponents } from "mdx/types";
import * as C from "./app/components";
import { HelpIconButton } from "./app/components/Layout/components/Content/components/HelpIconButton/helpIconButton";
import { Link } from "./app/components/Layout/components/Content/components/Link/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Alert: C.Alert,
    AlertTitle: C.AlertTitle,
    Banner: C.Banner,
    HelpIconButton: HelpIconButton,
    TagWarning: C.TagWarning,
    a: Link,
  };
}
