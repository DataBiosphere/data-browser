import { ExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { ComponentProps } from "react";
import { ExportToPlatform } from "../../../../app/components";
import { ExportIcon } from "../../../../app/components/Export/components/AnVILExplorer/components/ExportMethod/components/ExportIcon/exportIcon";
import { ROUTES } from "./routes";

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
  CANCER_GENOMICS_CLOUD: {
    buttonLabel: "Open Cancer Genomics Cloud",
    description:
      "CGC is a cloud workspace for analysis, storage, and computation using workflows, Jupyter Notebooks, and RStudio.",
    successTitle: "Your Cancer Genomics Cloud Workspace Link is Ready",
    title: "Analyze in Cancer Genomics Cloud",
  },
  CAVATICA: {
    buttonLabel: "Open CAVATICA",
    description:
      "CAVATICA is a cloud workspace for analysis, storage, and computation using workflows, Jupyter Notebooks, and RStudio.",
    successTitle: "Your CAVATICA Workspace Link is Ready",
    title: "Analyze in CAVATICA",
  },
};

export const EXPORT_METHODS: Record<
  string,
  Pick<
    ComponentProps<typeof ExportMethod>,
    "description" | "icon" | "route" | "title"
  >
> = {
  BIO_DATA_CATALYST: {
    description: EXPORTS.BIO_DATA_CATALYST.description,
    icon: <ExportIcon alt="BDC" src="/export/bdc.webp" width={24} />,
    route: ROUTES.BIO_DATA_CATALYST,
    title: "Export to BioData Catalyst Powered by Seven Bridges (BDC-SB)",
  },
  CANCER_GENOMICS_CLOUD: {
    description: EXPORTS.CANCER_GENOMICS_CLOUD.description,
    icon: <ExportIcon alt="CGC" src="/export/cgc.webp" width={24} />,
    route: ROUTES.CANCER_GENOMICS_CLOUD,
    title: "Export to Cancer Genomics Cloud (CGC)",
  },
  CAVATICA: {
    description: EXPORTS.CAVATICA.description,
    icon: <ExportIcon alt="CAVATICA" src="/export/cavatica.webp" width={24} />,
    route: ROUTES.CAVATICA,
    title: "Export to CAVATICA",
  },
};
