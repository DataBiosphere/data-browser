import { JSX } from "react";

/**
 * Mock implementation of findable-ui's MarkdownRenderer for tests.
 * findable-ui's MarkdownRenderer pulls in the ESM-only remark / rehype /
 * unified ecosystem, which next/jest does not transform (only app code and
 * `transpilePackages` are transpiled). No unit test renders markdown, so a
 * lightweight stub keeps that ESM chain out of the jest module graph.
 */
export const MarkdownRenderer = jest.fn(
  ({ value }: { value?: string }): JSX.Element => <div>{value}</div>
);
