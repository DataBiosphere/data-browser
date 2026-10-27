/**
 * @jest-environment node
 */
import { setConfig } from "@databiosphere/findable-ui/lib/config/config.js";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { fetchApi } from "@databiosphere/findable-ui/lib/entity/common/client";
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

const mockFetch = jest.fn();

beforeAll(async () => {
  setConfig(TEST_SITE_CONFIG as SiteConfig);
  globalThis.fetch = mockFetch;
});

const STATUS_CODES_TO_TEST = [400, 429, 500, 502, 503, 504];
const NO_RETRY_STATUS_CODES = [400];

describe("api", () => {
  for (const status of STATUS_CODES_TO_TEST) {
    describe(`response status ${status}`, () => {
      it(`does not retry when Retry-After is absent`, async () => {
        mockResponseOnce("", { status });
        await expect(fetchApi("")).rejects.toMatchObject({
          response: { status },
        });
      });

      it("does not retry when Retry-After contains empty string", async () => {
        mockResponseOnce("", {
          headers: { "Retry-After": "" },
          status,
        });
        await expect(fetchApi("")).rejects.toMatchObject({
          response: { status },
        });
      });

      if (NO_RETRY_STATUS_CODES.includes(status)) {
        it("does not retry when Retry-After has content", async () => {
          mockSetTimeout.mockClear();
          mockResponseOnce("", {
            headers: { "Retry-After": "345" },
            status,
          });
          await expect(fetchApi("")).rejects.toMatchObject({
            response: { status },
          });
        });
      } else {
        it("retries based on Retry-After when it has content", async () => {
          mockSetTimeout.mockClear();
          mockResponseOnce("", {
            headers: { "Retry-After": "345" },
            status,
          });
          mockResponseOnce("after-retry");
          const resTrue = await fetchApi("");
          expect(resTrue.status).toBe(200);
          expect(await resTrue.text()).toBe("after-retry");
          expect(mockSetTimeout.mock.calls[1][1]).toBe(345000);
        });
      }
    });
  }

  describe("other errors", () => {
    it("retries on fetch failure", async () => {
      mockRejectOnce(new TypeError("Failed to fetch"));
      mockResponseOnce("after-retry");
      const resTrue = await fetchApi("");
      expect(resTrue.status).toBe(200);
      expect(await resTrue.text()).toBe("after-retry");
    });
  });
});

function mockResponseOnce(data?: BodyInit | null, init?: ResponseInit): void {
  mockFetch.mockResolvedValueOnce(new Response(data, init));
}

function mockRejectOnce(error: unknown): void {
  mockFetch.mockRejectedValueOnce(error);
}
