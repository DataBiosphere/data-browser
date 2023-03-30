import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React, { ReactNode } from "react";

export type MDXSerializeResult = MDXRemoteSerializeResult | null;

interface Props {
  fallback?: ReactNode; // React node to display when source is absent of a serialized result.
  source: MDXSerializeResult;
}

const components = {};

export const MdxMarkdown = ({ fallback, source }: Props): JSX.Element => {
  return source ? (
    <MDXRemote {...source} components={components}></MDXRemote>
  ) : (
    <>{fallback}</>
  );
};
