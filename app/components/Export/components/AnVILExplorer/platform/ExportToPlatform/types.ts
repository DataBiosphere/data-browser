import { Filters } from "@databiosphere/findable-ui/lib/common/entities";
import { FormFacet } from "@databiosphere/findable-ui/lib/components/Export/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";

/**
 * Platform endpoint that imports a PFB from a signed URL.
 */
export interface PlatformImport {
  baseUrl: string;
  source: string;
}

export interface Props {
  buttonLabel: string;
  description: string;
  fileManifestState: FileManifestState;
  fileSummaryFacetName: string;
  filters: Filters;
  formFacet: FormFacet;
  platformImport?: PlatformImport;
  speciesFacetName: string;
  successTitle: string;
  title: string;
}
