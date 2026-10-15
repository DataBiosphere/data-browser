import { setConfig } from "@databiosphere/findable-ui/lib/config/config.js";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { fetchApi } from "@databiosphere/findable-ui/lib/entity/common/client";
import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { AZUL_KY_OPTIONS } from "site-config/common/constants";

// The test site config includes only the relevant parts of the site config in the return value
const TEST_SITE_CONFIG: Pick<SiteConfig, "dataSource" | "kyOptions"> = {
  dataSource: {
    url: "http://example.com",
  },
  kyOptions: AZUL_KY_OPTIONS,
};

jest
  .spyOn(globalThis, "setTimeout")
  .mockImplementation(((callback: () => void) =>
    callback()) as typeof setTimeout);

beforeAll(async () => {
  setConfig(TEST_SITE_CONFIG as SiteConfig);
  fetchMock.doMock();
  globalThis.fetch = ((...args) => {
    return fetchMock(...(args as Parameters<typeof fetchMock>));
  }) as typeof fetch;
  AbortSignal.prototype.throwIfAborted = function (): void {
    if (this.aborted) throw this.reason;
  };
});

describe("api", () => {
  it("retries based on ky options in site config", async () => {
    fetchMock.mockResponseOnce("", { status: 429 });
    await expect(fetchApi("")).rejects.toMatchObject({
      response: {
        status: 429,
      },
    });

    fetchMock.mockResponseOnce("", {
      headers: { "Retry-After": "5" },
      status: 429,
    });
    fetchMock.mockResponseOnce("after-retry");
    const resTrue = await fetchApi("");
    expect(resTrue.status).toBe(200);
    expect(await resTrue.text()).toBe("after-retry");
  });
});
