/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing matrix get modal component.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { SearchTerm } from "../../search/search-term.model";
import { MatrixResponse } from "../../shared/matrix-response.model";

export interface HCAGetMatrixState {

    fileSummary: FileSummary;
    matrixPartialQueryMatch: boolean;
    matrixFileFormats: string[];
    matrixResponse: MatrixResponse;
    selectedSearchTerms: SearchTerm[];
}
