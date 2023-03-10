import { SectionDetailsEmpty } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

export type MDXSerializeResult = MDXRemoteSerializeResult | null;

interface Props {
  fallbackText?: string; // Text to display when source is absent of a serialized result.
  source: MDXSerializeResult;
}

const components = {};

export const MdxMarkdown = ({ fallbackText, source }: Props): JSX.Element => {
  return source ? (
    <MDXRemote {...source} components={components}></MDXRemote>
  ) : (
    <SectionDetailsEmpty displayText={fallbackText} />
  );
};
