import {
  MdxMarkdown,
  MDXSerializeResult,
} from "../../../../../common/MDXMarkdown/mdxMarkdown";
import { SectionText } from "./consortiumDescription.styles";
import { JSX } from "react";

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
