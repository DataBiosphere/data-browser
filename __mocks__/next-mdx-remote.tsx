import React from "react";

/**
 * Mock implementation of next-mdx-remote for testing.
 */

export const MDXRemote = jest.fn(({ children }) => <div>{children}</div>);

export const serialize = jest.fn().mockResolvedValue({
  compiledSource: "",
  frontmatter: {},
  scope: {},
});
