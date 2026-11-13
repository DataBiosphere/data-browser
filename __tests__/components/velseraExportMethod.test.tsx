import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { VelseraExportMethod } from "../../app/components/Export/components/AnVILExplorer/platform/VelseraExportMethod/velseraExportMethod";
import { FEATURES } from "../../app/shared/entities";

jest.mock("@databiosphere/findable-ui/lib/hooks/useDownloadStatus", () => ({
  useDownloadStatus: (): { disabled: boolean; message: string } => ({
    disabled: false,
    message: "",
  }),
}));

const COMING_SOON = "Coming Soon";

const THEME = createAppTheme();

const PROPS = {
  description: "BDC-SB is a cloud workspace.",
  route: "/export/biodata-catalyst",
  title: "Export to BioData Catalyst",
};

/**
 * Renders VelseraExportMethod within the app theme.
 * @param props - Export method props.
 */
function renderMethod(props: ComponentProps<typeof VelseraExportMethod>): void {
  render(
    <ThemeProvider theme={THEME}>
      <VelseraExportMethod {...props} />
    </ThemeProvider>
  );
}

describe("VelseraExportMethod", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("shows coming soon when the Velsera export flag is off", () => {
    renderMethod(PROPS);
    expect(screen.getByText(COMING_SOON)).toBeTruthy();
  });

  it("enables the method when the Velsera export flag is on", () => {
    localStorage.setItem(FEATURES.VELSERA_EXPORT, "true");
    renderMethod(PROPS);
    expect(screen.queryByText(COMING_SOON)).toBeNull();
  });

  it("shows coming soon when configured so, even with the flag on", () => {
    localStorage.setItem(FEATURES.VELSERA_EXPORT, "true");
    renderMethod({ ...PROPS, comingSoon: true });
    expect(screen.getByText(COMING_SOON)).toBeTruthy();
  });
});
