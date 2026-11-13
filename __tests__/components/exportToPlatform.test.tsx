import type {
  FileLocation,
  UseRequestFileLocationResult,
} from "@databiosphere/findable-ui/lib/hooks/useRequestFileLocation";
import type { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { ExportToPlatform } from "../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/exportToPlatform";
import type {
  PlatformImport,
  Props,
} from "../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/types";
import {
  buildPlatformImportUrl,
  getPlatformImportUrl,
  isPlatformImportAvailable,
} from "../../app/components/Export/components/AnVILExplorer/platform/ExportToPlatform/utils";
import { FEATURES } from "../../app/shared/entities";

const mockUseRequestFileLocation = jest.fn<UseRequestFileLocationResult, []>();

jest.mock("@databiosphere/findable-ui/lib/hooks/useDownloadStatus", () => ({
  useDownloadStatus: (): {
    disabled: boolean;
    isLoading: boolean;
    message: string;
  } => ({ disabled: false, isLoading: false, message: "" }),
}));

jest.mock(
  "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifest",
  () => ({ useFileManifest: jest.fn() })
);

jest.mock(
  "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifestFileCount",
  () => ({ useFileManifestFileCount: jest.fn() })
);

jest.mock("@databiosphere/findable-ui/lib/hooks/useFileManifestState", () => ({
  useFileManifestState: (): {
    fileManifestDispatch: jest.Mock;
    fileManifestState: { isLoading: boolean };
  } => ({
    fileManifestDispatch: jest.fn(),
    fileManifestState: { isLoading: false },
  }),
}));

jest.mock(
  "@databiosphere/findable-ui/lib/hooks/useRequestFileLocation",
  () => ({
    useRequestFileLocation: (): UseRequestFileLocationResult =>
      mockUseRequestFileLocation(),
  })
);

jest.mock(
  "@databiosphere/findable-ui/lib/hooks/useRequestManifest/useRequestManifest",
  () => ({
    useRequestManifest: (): { requestMethod: string; requestUrl: string } => ({
      requestMethod: "PUT",
      requestUrl: "https://service.example.org/manifest/files",
    }),
  })
);

jest.mock("@databiosphere/findable-ui/lib/providers/loginGuard/hook", () => ({
  useLoginGuard: (): { requireLogin: jest.Mock } => ({
    requireLogin: jest.fn(),
  }),
}));

const PLATFORM_IMPORT: PlatformImport = {
  baseUrl: "https://platform.sb.biodatacatalyst.nhlbi.nih.gov/import/pfb",
  source: "bdc",
};

const SIGNED_URL =
  "https://storage.googleapis.com/bucket/manifest.avro?X-Goog-Signature=a%2Fb&X-Goog-Expires=3600";

const IMPORT_URL =
  "https://platform.sb.biodatacatalyst.nhlbi.nih.gov/import/pfb?URL=https%3A%2F%2Fstorage.googleapis.com%2Fbucket%2Fmanifest.avro%3FX-Goog-Signature%3Da%252Fb%26X-Goog-Expires%3D3600&source=bdc";

const FILE_LOCATION: FileLocation = { location: SIGNED_URL, status: 302 };

describe("buildPlatformImportUrl", () => {
  it("encodes the signed URL and appends the source", () => {
    expect(buildPlatformImportUrl(PLATFORM_IMPORT, SIGNED_URL)).toBe(
      IMPORT_URL
    );
  });

  it("round-trips the signed URL through the URL parameter", () => {
    const url = new URL(buildPlatformImportUrl(PLATFORM_IMPORT, SIGNED_URL));
    expect(url.searchParams.get("URL")).toBe(SIGNED_URL);
    expect(url.searchParams.get("source")).toBe("bdc");
  });
});

describe("getPlatformImportUrl", () => {
  it("returns the import URL when enabled with a config and file location", () => {
    expect(getPlatformImportUrl(true, PLATFORM_IMPORT, FILE_LOCATION)).toBe(
      IMPORT_URL
    );
  });

  it("returns undefined when the feature flag is off", () => {
    expect(
      getPlatformImportUrl(false, PLATFORM_IMPORT, FILE_LOCATION)
    ).toBeUndefined();
  });

  it("returns undefined when the platform has no import config", () => {
    expect(
      getPlatformImportUrl(true, undefined, FILE_LOCATION)
    ).toBeUndefined();
  });

  it("returns undefined before the file location is available", () => {
    expect(
      getPlatformImportUrl(true, PLATFORM_IMPORT, undefined)
    ).toBeUndefined();
  });
});

describe("isPlatformImportAvailable", () => {
  it("returns true when enabled with a config", () => {
    expect(isPlatformImportAvailable(true, PLATFORM_IMPORT)).toBe(true);
  });

  it("returns false when the feature flag is off", () => {
    expect(isPlatformImportAvailable(false, PLATFORM_IMPORT)).toBe(false);
  });

  it("returns false when the platform has no import config", () => {
    expect(isPlatformImportAvailable(true, undefined)).toBe(false);
  });
});

const BUTTON_LABEL = "Open BioData Catalyst";

const REQUEST_LINK = "Request Link";

const FILE_MANIFEST_STATE: FileManifestState = {
  fileCount: undefined,
  fileSummary: undefined,
  fileSummaryFacetName: undefined,
  fileSummaryFilters: [],
  filesFacets: [],
  filters: [],
  isEnabled: true,
  isFacetsLoading: false,
  isFacetsSuccess: true,
  isFileSummaryLoading: false,
  isLoading: false,
  isSummaryLoading: false,
  summary: undefined,
};

const PROPS: Props = {
  buttonLabel: BUTTON_LABEL,
  description: "BDC-SB is a cloud workspace.",
  fileManifestState: FILE_MANIFEST_STATE,
  fileSummaryFacetName: "files.file_format",
  filters: [],
  formFacet: {},
  platformImport: PLATFORM_IMPORT,
  speciesFacetName: "donors.organism_type",
  successTitle: "Your BioData Catalyst Workspace Link is Ready",
  title: "Analyze in BioData Catalyst",
};

const THEME = createAppTheme();

/**
 * Builds a useRequestFileLocation result.
 * @param data - File location returned by the manifest request.
 * @returns useRequestFileLocation result.
 */
function buildFileLocationResult(
  data: FileLocation | undefined
): UseRequestFileLocationResult {
  return {
    data,
    isIdle: !data,
    isLoading: false,
    isSuccess: !!data,
    run: jest.fn(),
  };
}

/**
 * Returns the "Request Link" button.
 * @returns "Request Link" button element.
 */
function getRequestLinkButton(): HTMLElement {
  return screen.getByRole("button", { name: REQUEST_LINK });
}

/**
 * Renders ExportToPlatform within the app theme.
 * @param props - Export to platform props.
 */
function renderExportToPlatform(props: Props): void {
  render(
    <ThemeProvider theme={THEME}>
      <ExportToPlatform {...props} />
    </ThemeProvider>
  );
}

describe("ExportToPlatform", () => {
  afterEach(() => {
    localStorage.clear();
    mockUseRequestFileLocation.mockReset();
  });

  it("disables Request Link when the Velsera export flag is off", () => {
    mockUseRequestFileLocation.mockReturnValue(
      buildFileLocationResult(undefined)
    );
    renderExportToPlatform(PROPS);
    expect(getRequestLinkButton().hasAttribute("disabled")).toBe(true);
  });

  it("disables Request Link when the platform has no import endpoint", () => {
    localStorage.setItem(FEATURES.VELSERA_EXPORT, "true");
    mockUseRequestFileLocation.mockReturnValue(
      buildFileLocationResult(undefined)
    );
    renderExportToPlatform({ ...PROPS, platformImport: undefined });
    expect(getRequestLinkButton().hasAttribute("disabled")).toBe(true);
  });

  it("enables Request Link when the Velsera export flag is on", () => {
    localStorage.setItem(FEATURES.VELSERA_EXPORT, "true");
    mockUseRequestFileLocation.mockReturnValue(
      buildFileLocationResult(undefined)
    );
    renderExportToPlatform(PROPS);
    expect(getRequestLinkButton().hasAttribute("disabled")).toBe(false);
  });

  it("links to the import URL once the PFB location is available", () => {
    localStorage.setItem(FEATURES.VELSERA_EXPORT, "true");
    mockUseRequestFileLocation.mockReturnValue(
      buildFileLocationResult(FILE_LOCATION)
    );
    renderExportToPlatform(PROPS);
    const link = screen.getByRole("link", { name: BUTTON_LABEL });
    expect(link.getAttribute("href")).toBe(IMPORT_URL);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("keeps the form when the flag is off, even with a PFB location", () => {
    mockUseRequestFileLocation.mockReturnValue(
      buildFileLocationResult(FILE_LOCATION)
    );
    renderExportToPlatform(PROPS);
    expect(screen.queryByRole("link", { name: BUTTON_LABEL })).toBeNull();
    expect(getRequestLinkButton().hasAttribute("disabled")).toBe(true);
  });
});
