// TODO convert Markdown to be able to use MDX.
import React from "react";

interface Props {
  content: string;
}

export const Markdown = ({ content }: Props): JSX.Element => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
