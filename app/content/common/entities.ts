import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";

export interface AnchorProps {
  children: ReactNode;
  href: string;
}

export interface ContentFrontmatter {
  pageDescription?: string;
  pageTitle: string;
}

export interface ContentProps {
  layoutStyle?: LayoutStyle;
  mdxSource: MDXRemoteSerializeResult | null;
  pageDescription?: string | null;
  pageTitle: string;
  slug: string[] | null;
}
