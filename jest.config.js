// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports -- Required for Jest setup
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "\\.mdx$": "<rootDir>/__mocks__/mdx.ts",
    // findable-ui's MarkdownRenderer imports the ESM-only remark/rehype/unified
    // chain, which next/jest leaves untransformed; stub it (no test renders markdown).
    "^@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer$":
      "<rootDir>/__mocks__/markdownRenderer.tsx",
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/e2e/",
    "/analytics/",
    // Shared helpers for the view model builder tests, not test suites.
    "/__tests__/viewModelBuilders/utils/",
  ],
};

// ESM-only packages in node_modules that need to be transformed for Jest, in addition to the
// packages in next.config's transpilePackages (which next/jest already exempts from transformIgnorePatterns).
const ESM_PACKAGES = ["ky"];

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Plain JS file; can't annotate return type
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  return {
    ...config,
    // Add the ESM packages to next/jest's node_modules exemption lists, which are of the form "(?!(pkg-a|pkg-b|...)".
    transformIgnorePatterns: config.transformIgnorePatterns.map((pattern) =>
      pattern.replace("(?!(", `(?!(${ESM_PACKAGES.join("|")}|`)
    ),
  };
};
