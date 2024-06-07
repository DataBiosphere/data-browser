import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { MDXComponents } from "mdx/types";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";

export type MDXSerializeResult = MDXRemoteSerializeResult | null;

interface Props {
  fallback?: ReactNode; // React node to display when source is absent of a serialized result.
  source: MDXSerializeResult;
}

const components: MDXComponents = {
  a: ({ children, href }): JSX.Element =>
    Link({ label: children, url: href ?? "" }),
};

export const MdxMarkdown = ({ fallback, source }: Props): JSX.Element => {
  return source ? (
    <MDXRemote {...source} components={components}></MDXRemote>
  ) : (
    <>{fallback}</>
  );
};
