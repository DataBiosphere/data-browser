import { FluidPaper } from "app/components/common/Paper/paper.styles";
import React, { ReactNode } from "react";
import { SectionTitle } from "../../../Detail/components/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionContent,
  SectionText,
} from "../../../Detail/components/Section/section.styles";

export type Content = ReactNode | ReactNode[] | string[];

interface Props {
  text: Content;
  title?: string;
}

/**
 * Returns content to be displayed within the section.
 * @param content - Content as either a React node or nodes, or string array.
 * @returns section content element.
 */
function getSectionContent(content: Content): JSX.Element {
  if (isContentString(content)) {
    return <p>{content}</p>;
  }
  if (isContentStringArray(content)) {
    return (
      <>
        {content.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </>
    );
  }
  return <>{content}</>;
}

/**
 * Determine if given content is string.
 * @param content - Content as either a React node or nodes, or string array.
 * @returns true if the given content is string.
 */
function isContentString(content: Content): content is string {
  return typeof content === "string";
}

/**
 * Determine if given content is string array.
 * @param contents - Content as either a React node or nodes, or string array.
 * @returns true if the given content is string array.
 */
function isContentStringArray(contents: Content): contents is string[] {
  return (
    Array.isArray(contents) &&
    contents?.every((content) => typeof content === "string")
  );
}

export const TitledText = ({ text, title }: Props): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          {title && <SectionTitle title={title} />}
          <SectionText component="div" variant="text-body-400-2lines">
            {getSectionContent(text)}
          </SectionText>
        </SectionContent>
      </Section>
    </FluidPaper>
  );
};
