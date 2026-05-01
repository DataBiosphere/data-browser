import type { PageMeta } from "./entities";

export const CONTENT_PAGE_META: Record<string, PageMeta> = {
  "beta-announcement": {
    pageDescription:
      "AnVIL Data Explorer beta launch announcement and new features.",
    pageTitle: "Beta Announcement",
  },
  "ga-announcement": {
    pageDescription: "AnVIL Data Explorer general availability announcement.",
    pageTitle: "GA Announcement",
  },
  guides: {
    pageDescription:
      "Guides for downloading and accessing data from the AnVIL Data Explorer.",
    pageTitle: "Guides",
  },
  "guides/data-download-options": {
    pageDescription:
      "Overview of data download options available in the AnVIL Data Explorer.",
    pageTitle: "Data Download Options",
  },
  "guides/data-download-via-curl": {
    pageDescription: "Download datasets using the curl command line tool.",
    pageTitle: "Data Download via curl",
  },
  "guides/individual-file-download": {
    pageDescription:
      "Download individual files directly from the AnVIL Data Explorer.",
    pageTitle: "Individual File Download",
  },
  "guides/tsv-file-manifest-download": {
    pageDescription:
      "Export a TSV file manifest with download URLs from the AnVIL Data Explorer.",
    pageTitle: "TSV File Manifest Download",
  },
  privacy: {
    pageDescription: "Privacy policy for this data explorer.",
    pageTitle: "Privacy Policy",
  },
  "terms-of-service": {
    pageDescription: "Terms of service for this data explorer.",
    pageTitle: "Terms of Service",
  },
};
