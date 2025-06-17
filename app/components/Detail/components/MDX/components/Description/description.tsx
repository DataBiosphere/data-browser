import { CollapsableSection } from "@databiosphere/findable-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { DescriptionProps } from "./types";
import { MDX_COMPONENTS } from "./common/constants";

export const Description = ({ content }: DescriptionProps): JSX.Element => {
  return (
    <CollapsableSection collapsable={false} title="Description">
      <MarkdownRenderer components={MDX_COMPONENTS} value={content} />
    </CollapsableSection>
  );
};
