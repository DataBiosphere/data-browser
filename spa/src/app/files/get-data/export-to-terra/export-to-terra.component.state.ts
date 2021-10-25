/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing Terra export component.
 */

// App dependencies
import { FileTypeSummary } from "../../file-summary/file-type-summary.model";
import { SearchTerm } from "../../search/search-term.model";
import { ExportToTerraStatus } from "../../shared/export-to-terra-status.model";

export interface ExportToTerraComponentState {

    exportToTerraStatus: ExportToTerraStatus;
    exportToTerraUrl: string;
    fileTypeSummaries: FileTypeSummary[];
    selectedSearchTerms: SearchTerm[];
    selectedSearchTermNames: string[];
}
