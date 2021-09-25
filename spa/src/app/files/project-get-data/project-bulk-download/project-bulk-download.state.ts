/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project bulk download component.
 */

// App dependencies
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileTypeSummary } from "../../file-summary/file-type-summary";
import { Project } from "../../shared/project.model";
import { Facet } from "../../facet/facet.model";
import { FileSummary } from "../../file-summary/file-summary";

export interface ProjectBulkDownloadState {

    loaded: boolean;
    filesFacets?: Facet[]
    fileSummary?: FileSummary;
    fileTypeSummaries?: FileTypeSummary[];
    manifestResponse?: ManifestResponse;
    project?: Project;
}
