import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import type { JSX } from "react";
import { renderToString } from "react-dom/server.node";
import { ExploreBackPageHero } from "../../app/components/Layout/components/BackPage/components/ExploreBackPageHero/exploreBackPageHero";
import { getExploreBreadcrumb } from "../../app/components/Layout/components/BackPage/components/ExploreBackPageHero/utils";

// Trailing breadcrumb text, distinct from the title so a dropped breadcrumb is caught.
const TRAILING_CRUMB_TEXT = "Dataset Crumb";

// The explore list the provider returns; set per render to stand in for the URL's `list` param.
let mockExploreList = "datasets";

jest.mock("@databiosphere/findable-ui/lib/hooks/useConfig", () => ({
  useConfig: (): { entityConfig: { route: string } } => ({
    entityConfig: { route: "datasets" },
  }),
}));

jest.mock("@databiosphere/findable-ui/lib/providers/exploreList/hook", () => ({
  useExploreList: (): string => mockExploreList,
}));

const THEME = createAppTheme();

/**
 * Returns the hero under test, with a dataset breadcrumb after "Explore".
 * @returns The hero element.
 */
function renderHero(): JSX.Element {
  return (
    <ThemeProvider theme={THEME}>
      <ExploreBackPageHero
        breadcrumbs={[{ path: "", text: TRAILING_CRUMB_TEXT }]}
        title="Test Dataset"
      />
    </ThemeProvider>
  );
}

/**
 * Renders the hero to static HTML with the page's entity list, as the static export does, then hydrates it with the
 * given explore list, as a cold page load does.
 * @param exploreList - Explore list on the client, e.g. from the URL's `list` param.
 */
function hydrateHero(exploreList: string): void {
  mockExploreList = "datasets";
  const container = document.createElement("div");
  container.innerHTML = renderToString(renderHero());
  document.body.appendChild(container);
  mockExploreList = exploreList;
  render(renderHero(), { container, hydrate: true });
}

describe("ExploreBackPageHero", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("links Explore to the page's entity list in the static HTML", () => {
    mockExploreList = "datasets";

    const html = renderToString(renderHero());

    expect(html).toMatch(/<a[^>]*href="\/datasets"[^>]*>Explore<\/a>/);
    expect(html).toContain(TRAILING_CRUMB_TEXT);
  });

  it("links Explore to the URL's list after hydrating a cold page", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();

    hydrateHero("files");

    expect(
      screen.getByRole("link", { name: "Explore" }).getAttribute("href")
    ).toBe("/files");
    expect(screen.getByText(TRAILING_CRUMB_TEXT)).toBeTruthy();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("keeps the page's entity list after hydrating a page without a list", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();

    hydrateHero("datasets");

    expect(
      screen.getByRole("link", { name: "Explore" }).getAttribute("href")
    ).toBe("/datasets");
    expect(screen.getByText(TRAILING_CRUMB_TEXT)).toBeTruthy();
    expect(consoleError).not.toHaveBeenCalled();
  });
});

describe("getExploreBreadcrumb", () => {
  it("links the Explore breadcrumb to the given explore list", () => {
    expect(getExploreBreadcrumb("files")).toEqual({
      path: "/files",
      text: "Explore",
    });
  });
});
