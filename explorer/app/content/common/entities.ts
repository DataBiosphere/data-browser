import { LayoutStyle } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ContentProps {
  frontmatter: Frontmatter | null;
  mdxSource: MDXRemoteSerializeResult | null;
  slug: string[] | null;
}

export interface Frontmatter {
  layoutStyle?: LayoutStyle;
}
