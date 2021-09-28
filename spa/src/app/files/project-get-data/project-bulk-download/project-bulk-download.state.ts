/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project bulk download component.
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileTypeSummary } from "../../file-summary/file-type-summary";
import { FileSummary } from "../../file-summary/file-summary";
import { Project } from "../../shared/project.model";
import { SearchTerm } from "../../search/search-term.model";

export interface ProjectBulkDownloadState {

    loaded: boolean;
    filesFacets?: Facet[]
    fileSummary?: FileSummary;
    fileTypeSummaries?: FileTypeSummary[];
    manifestResponse?: ManifestResponse;
    project?: Project;
    selectedSearchTermNames?: string[];
    selectedSearchTerms?: SearchTerm[];
}
