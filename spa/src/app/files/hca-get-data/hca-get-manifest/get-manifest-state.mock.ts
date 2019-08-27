/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of get manifest values of the get manifest state.
 */

// App dependencies
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { DEFAULT_FILE_SUMMARY } from "../../shared/file-summary.mock";
import { ManifestStatus } from "../../shared/manifest-status.model";
import { ManifestResponse } from "../../shared/manifest-response.model";
import { HCAGetManifestState } from "./hca-get-manifest.state";

// Example empty file summary
export const DEFAULT_FILE_SUMMARY_EMPTY = {
    "donorCount": 0,
    "fileCount": 0,
    "fileTypeSummaries": [],
    "organTypes": [],
    "projectCount": 0,
    "specimenCount": 0,
    "totalCellCount": 0,
    "totalFileSize": 0
};

// Example of selected search term with facet "fileFormat"
export const DEFAULT_SEARCH_TERM_WITH_FILE_FORMAT = [
    new SearchFileFacetTerm("fileFormat", "fastq", 123),
    new SearchFileFacetTerm("disease", "ESRD", 8),
    new SearchFileFacetTerm("genusSpecies", "Homo sapiens", 20)
];

// Example of manifest response with status "NOT_STARTED"
export const DEFAULT_MANIFEST_RESPONSE_NOT_STARTED =
    {
        "eta": "",
        "matrixUrl": "",
        "message": "",
        "requestId": "",
        "status": ManifestStatus.NOT_STARTED
    } as ManifestResponse;
