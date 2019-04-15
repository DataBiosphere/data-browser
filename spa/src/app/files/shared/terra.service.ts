/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Terra-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { ExportToTerraResponse } from "./export-to-terra-response.model";
import { ExportToTerraStatus } from "./export-to-terra-status.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetListState } from "../_ngrx/file-facet-list/file-facet-list.state";
import { TerraDAO } from "./terra.dao";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";

@Injectable()
export class TerraService {

    /**
     * @param {TerraDAO} terraDAO
     */
    constructor(private terraDAO: TerraDAO) {
    }

    /**
     * Build up the complete export to Terra URL, for opening a Terra workspace in a new tab.
     *
     * @param {string} exportUrl
     * @returns {string}
     */
    public buildExportToTerraWorkspaceUrl(exportUrl: string): string {

        const encdodedUrl = encodeURIComponent(exportUrl);
        return `https://app.terra.bio/#import-data?url=${encdodedUrl}`;
    }

    /**
     * Returns true if the specified export to Terra request has been completed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestComplete(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.COMPLETE;
    }

    /**
     * Returns true if the specified export to Terra request has failed.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestFailed(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.FAILED;
    }

    /**
     * Returns true if the specified export to Terra request has been initiated.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestInitiated(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.INITIATED;
    }

    /**
     * Returns true if the specified export to Terra request is in progress.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestInProgress(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.IN_PROGRESS;
    }

    /**
     * Returns true if the specified export to Terra request has not yet been initiated.
     *
     * @param {ExportToTerraStatus} status
     * @returns {boolean}
     */
    public isExportToTerraRequestNotStarted(status: ExportToTerraStatus): boolean {

        return status === ExportToTerraStatus.NOT_STARTED;
    }

    /**
     * Export current state of selected facets to Terra.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(searchTerms: SearchTerm[]): Observable<ExportToTerraResponse> {

        const filteredSearchTerms = searchTerms.reduce((accum, searchTerm) => {

            if ( searchTerm.facetName !== FileFacetName.FILE_FORMAT && searchTerm.name !== FileFormat.MATRIX ) {
                accum.push(searchTerm);
            }
            return accum;
        }, []);

        return this.terraDAO.exportToTerra(filteredSearchTerms);
    }
}
