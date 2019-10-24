/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing matrix get modal component.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { SearchTerm } from "../../search/search-term.model";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";

export interface HCAGetMatrixState {

    fileSummary: FileSummary;
    matrixPartialQueryMatch: boolean;
    matrixPartialQueryMatchCompleted: boolean;
    matrixFileFormats: string[];
    matrixUrlRequests: MatrixUrlRequest[];
    selectedSearchTerms: SearchTerm[];
    matrixUrlRequestStatus: MatrixUrlRequestStatus; // Overall status of matrix URL request/s (can be one or more requests, depending on the number of species included in the current data) 
}
