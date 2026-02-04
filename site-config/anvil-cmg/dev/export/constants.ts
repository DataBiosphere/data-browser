import { ROUTES } from "./routes";
import { ComponentProps } from "react";
import { ExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { ExportToPlatform } from "../../../../app/components";

export const EXPORTS: Record<
  string,
  Pick<
    ComponentProps<typeof ExportToPlatform>,
    "buttonLabel" | "description" | "successTitle" | "title"
  >
> = {
  BIO_DATA_CATALYST: {
    buttonLabel: "Open BioData Catalyst",
    description:
      "BDC-SB is a cloud workspace for analysis, storage, and computation using workflows, Jupyter Notebooks, and RStudio.",
    successTitle: "Your BioData Catalyst Workspace Link is Ready",
    title: "Analyze in BioData Catalyst",
  },
};

export const EXPORT_METHODS: Record<
  string,
  Pick<
    ComponentProps<typeof ExportMethod>,
    "buttonLabel" | "description" | "route" | "title"
  >
> = {
  BIO_DATA_CATALYST: {
    buttonLabel: "Analyze in NHLBI BioData Catalyst",
    description: EXPORTS.BIO_DATA_CATALYST.description,
    route: ROUTES.BIO_DATA_CATALYST,
    title: "Export to BioData Catalyst Powered by Seven Bridges (BDC-SB)",
  },
};
