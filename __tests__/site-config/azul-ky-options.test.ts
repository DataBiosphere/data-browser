/**
 * @jest-environment node
 */
import { setConfig } from "@databiosphere/findable-ui/lib/config/config.js";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { fetchApi } from "@databiosphere/findable-ui/lib/entity/common/client";
import fetchMock from "jest-fetch-mock";
import { AZUL_KY_OPTIONS } from "site-config/common/constants";

// Use the actual Ky rather than the mock in __mocks__
jest.unmock("ky");

// The test site config includes only the relevant parts of the site config in the return value
const TEST_SITE_CONFIG: Pick<SiteConfig, "dataSource" | "kyOptions"> = {
  dataSource: {
    url: "http://example.com",
  },
  kyOptions: AZUL_KY_OPTIONS,
};

const mockSetTimeout = jest
  .spyOn(globalThis, "setTimeout")
  .mockImplementation(((callback: () => void, timeout: number) => {
    // Ky has a built in 20-second timeout that causes the request to fail, which we don't want to call the callback for
    if (timeout !== 20000) callback();
  }) as typeof setTimeout);

beforeAll(async () => {
  setConfig(TEST_SITE_CONFIG as SiteConfig);
  fetchMock.doMock();
  globalThis.fetch = ((...args) => {
    return fetchMock(...(args as Parameters<typeof fetchMock>));
  }) as typeof fetch;
});

const STATUS_CODES_TO_TEST = [429, 500, 502, 503, 504];

describe("api", () => {
  for (const status of STATUS_CODES_TO_TEST) {
    describe(`reponse status ${status}`, () => {
      it(`does not retry when Retry-After is absent`, async () => {
        fetchMock.mockResponseOnce("", { status });
        await expect(fetchApi("")).rejects.toMatchObject({
          response: { status },
        });
      });

      it("does not retry when Retry-After contains empty string", async () => {
        fetchMock.mockResponseOnce("", {
          headers: { "Retry-After": "" },
          status,
        });
        await expect(fetchApi("")).rejects.toMatchObject({
          response: { status },
        });
      });

      it("retries based on Retry-After when it has content", async () => {
        mockSetTimeout.mockClear();
        fetchMock.mockResponseOnce("", {
          headers: { "Retry-After": "345" },
          status,
        });
        fetchMock.mockResponseOnce("after-retry");
        const resTrue = await fetchApi("");
        expect(resTrue.status).toBe(200);
        expect(await resTrue.text()).toBe("after-retry");
        expect(mockSetTimeout.mock.calls[1][1]).toBe(345000);
      });
    });
  }

  describe("other errors", () => {
    it("retries on fetch failure", async () => {
      fetchMock.mockRejectOnce(new TypeError("Failed to fetch"));
      fetchMock.mockResponseOnce("after-retry");
      const resTrue = await fetchApi("");
      expect(resTrue.status).toBe(200);
      expect(await resTrue.text()).toBe("after-retry");
    });
  });
});
