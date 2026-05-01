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
    pageDescription:
      "Download AnVIL datasets using the curl command line tool.",
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
    pageDescription: "Privacy policy for the AnVIL Data Explorer.",
    pageTitle: "Privacy Policy",
  },
  "terms-of-service": {
    pageDescription: "Terms of service for the AnVIL Data Explorer.",
    pageTitle: "Terms of Service",
  },
};

export const ENTITY_DETAIL_META: Record<string, PageMeta> = {
  datasets: {
    pageDescription:
      "View dataset details, access data, and export to analysis platforms.",
    pageTitle: "Dataset",
  },
};

export const ENTITY_LIST_META: Record<string, PageMeta> = {
  activities: {
    pageDescription:
      "Browse sequencing and analysis activities across AnVIL datasets.",
    pageTitle: "Activities",
  },
  biosamples: {
    pageDescription:
      "Explore biosamples available on the AnVIL platform, with details on tissue type and disease.",
    pageTitle: "BioSamples",
  },
  datasets: {
    pageDescription:
      "Browse and filter genomic datasets hosted on the AnVIL cloud platform.",
    pageTitle: "Datasets",
  },
  donors: {
    pageDescription:
      "Explore donor information across AnVIL datasets, including organism type and phenotype.",
    pageTitle: "Donors",
  },
  files: {
    pageDescription:
      "Search and download genomic data files hosted on the AnVIL platform.",
    pageTitle: "Files",
  },
};
