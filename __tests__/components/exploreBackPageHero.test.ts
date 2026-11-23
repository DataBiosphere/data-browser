import { getExploreBreadcrumb } from "../../app/components/Layout/components/BackPage/components/ExploreBackPageHero/utils";

describe("getExploreBreadcrumb", () => {
  it("links the Explore breadcrumb to the given explore list", () => {
    expect(getExploreBreadcrumb("files")).toEqual({
      path: "/files",
      text: "Explore",
    });
  });

  it("follows a different explore list", () => {
    expect(getExploreBreadcrumb("datasets").path).toBe("/datasets");
  });
});
