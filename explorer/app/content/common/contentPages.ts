import fs from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDX_SCOPE } from "./constants";
import { ContentProps } from "./entities";
import { getContentPathname, getMarkdownPathname, getSlug } from "./utils";

export async function getContentStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ContentProps>> {
  const slug = getSlug(context);
  const contentPathname = getContentPathname();
  if (!slug || !contentPathname) {
    return {
      props: {
        frontmatter: null,
        mdxSource: null,
        slug: null,
      },
    };
  }
  const markdownWithMeta = fs.readFileSync(
    getMarkdownPathname(contentPathname, slug),
    "utf-8"
  );
  const { content, data: frontmatter } = matter(markdownWithMeta);
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
      frontmatter,
      mdxSource,
      slug,
    },
  };
}
