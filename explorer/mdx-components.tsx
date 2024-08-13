import { TagWarning } from "@databiosphere/findable-ui/lib/components/common/Tag/tag.styles";
import { MDXComponents } from "mdx/types";
import { HelpIconButton } from "./app/components/Layout/components/Content/components/HelpIconButton/helpIconButton";
import { Link } from "./app/components/Layout/components/Content/components/Link/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    HelpIconButton: HelpIconButton,
    TagWarning,
    a: Link,
  };
}
