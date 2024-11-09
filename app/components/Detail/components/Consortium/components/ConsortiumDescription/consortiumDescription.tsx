import {
  MdxMarkdown,
  MDXSerializeResult,
} from "../../../../../common/MDXMarkdown/mdxMarkdown";
import { ConsortiumDescriptionFallback } from "./components/ConsortiumDescriptionFallback/consortiumDescriptionFallback";
import { SectionText } from "./consortiumDescription.styles";

interface ConsortiumDescriptionProps {
  source: MDXSerializeResult;
}

export const ConsortiumDescription = ({
  source,
}: ConsortiumDescriptionProps): JSX.Element => {
  return (
    <SectionText component="div">
      <MdxMarkdown
        fallback={<ConsortiumDescriptionFallback />}
        source={source}
      />
    </SectionText>
  );
};
