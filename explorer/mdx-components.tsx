import { MDXComponents } from "mdx/types";
import * as C from "./app/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ children, href }) => C.Link({ label: children, url: href ?? "" }),
  };
}
