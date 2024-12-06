import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";
import { MDX_COMPONENTS } from "./constants";

export type MDXSerializeResult = MDXRemoteSerializeResult | null;

interface Props {
  fallback?: ReactNode; // React node to display when source is absent of a serialized result.
  source: MDXSerializeResult;
}

export const MdxMarkdown = ({ fallback, source }: Props): JSX.Element => {
  if (!source) return <div>{fallback}</div>;
  return <MDXRemote {...source} components={MDX_COMPONENTS} />;
};
