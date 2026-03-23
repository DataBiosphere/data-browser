import { JSX } from "react";
import {
  MdxMarkdown,
  MDXSerializeResult,
} from "../../../../../common/MDXMarkdown/mdxMarkdown";
import { SectionText } from "./consortiumDescription.styles";

interface ConsortiumDescriptionProps {
  source: MDXSerializeResult;
}

export const ConsortiumDescription = ({
  source,
}: ConsortiumDescriptionProps): JSX.Element => {
  return (
    <SectionText component="div">
      <MdxMarkdown fallback="None" source={source} />
    </SectionText>
  );
};
