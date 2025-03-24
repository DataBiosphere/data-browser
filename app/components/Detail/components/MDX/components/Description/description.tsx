import { CollapsableSection } from "@databiosphere/findable-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import type { EvaluateOptions } from "@mdx-js/mdx";
import { evaluate } from "@mdx-js/mdx";
import type { MDXProps } from "mdx/types";
import { ReactNode, useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { MDX_COMPONENTS } from "./common/constants";
import { DescriptionProps } from "./types";
import DOMPurify from "isomorphic-dompurify";

type ReactMDXContent = (props: MDXProps) => ReactNode;
type Runtime = Pick<EvaluateOptions, "jsx" | "jsxs" | "Fragment">;

const runtime = { Fragment, jsx, jsxs } as Runtime;

export const Description = ({ content }: DescriptionProps): JSX.Element => {
  const [MdxContent, setMdxContent] = useState<ReactMDXContent>(
    () => (): null => null
  );

  useEffect(() => {
    const sanitizedContent = DOMPurify.sanitize(content)
      // escape curly braces
      .replace(/{/g, "&lcub;")
      .replace(/}/g, "&rcub;")
      // escape backticks
      .replace(/`/g, "&#96;");
    evaluate(sanitizedContent, { ...runtime, remarkPlugins: [remarkGfm] }).then(
      (r) => setMdxContent(() => r.default)
    );
  }, [content]);

  // Wrapping <MdxContent> with <div> to force `display: block`
  return (
    <CollapsableSection collapsable={false} title="Description">
      <div>
        {MdxContent ? <MdxContent components={MDX_COMPONENTS} /> : null}
      </div>
    </CollapsableSection>
  );
};
