import { FormFacet } from "@databiosphere/findable-ui/lib/components/Export/common/entities";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import { Filters } from "@databiosphere/findable-ui/lib/common/entities";

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
