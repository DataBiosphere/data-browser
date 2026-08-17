import { Filters } from "@databiosphere/findable-ui/lib/common/entities";
import { FormFacet } from "@databiosphere/findable-ui/lib/components/Export/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";

export interface Props {
  buttonLabel: string;
  description: string;
  fileManifestState: FileManifestState;
  fileSummaryFacetName: string;
  filters: Filters;
  formFacet: FormFacet;
  speciesFacetName: string;
  successTitle: string;
  title: string;
}
