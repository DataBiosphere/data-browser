import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDX_SCOPE } from "./constants";
import { ContentProps } from "./entities";
import {
  getContentPathname,
  getMarkdownPathname,
  getSlug,
  isContentPathnameExists,
} from "./utils";

export async function getContentStaticProps(
  context: GetStaticPropsContext,
  pageTitle: string
): Promise<GetStaticPropsResult<ContentProps>> {
  const slug = getSlug(context);
  const contentPathname = getContentPathname();
  if (
    !slug ||
    !contentPathname ||
    !isContentPathnameExists(contentPathname, slug)
  ) {
    return {
      props: {
        mdxSource: null,
        pageTitle,
        slug: null,
      },
    };
  }
  const markdownPathname = getMarkdownPathname(contentPathname, slug);
  const markdownWithMeta = fs.readFileSync(markdownPathname, "utf-8");
  const { content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: false, // See https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1363415249 and https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1378362096.
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: { ...MDX_SCOPE },
  });
  return {
    props: {
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      mdxSource,
      pageTitle,
      slug,
    },
  };
}
