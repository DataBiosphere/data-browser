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
import { FileManifestService } from "./file-manifest.service";
import { TerraDAO } from "./terra.dao";
import { SearchTerm } from "../search/search-term.model";
import { FileFacet } from "./file-facet.model";

@Injectable()
export class TerraService {

    /**
     * @param {FileManifestService} fileManifestService
     * @param {TerraDAO} terraDAO
     */
    constructor(private fileManifestService: FileManifestService, private terraDAO: TerraDAO) {
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
     * @param {FileFacet} fileFormats
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(searchTerms: SearchTerm[], fileFormats: FileFacet): Observable<ExportToTerraResponse> {

        const manifestSearchTerms = this.fileManifestService.buildManifestSearchTerms(searchTerms, fileFormats);
        return this.terraDAO.exportToTerra(manifestSearchTerms);
    }
}
