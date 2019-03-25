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
        return `https://bvdp-saturn-prod.appspot.com/#import-data?url=${encdodedUrl}`;
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
     * @param {FileFacetListState} ffls
     * @returns {Observable<ExportToTerraResponse>}
     */
    public exportToTerra(ffls: FileFacetListState): Observable<ExportToTerraResponse> {

        let selectedFacets = ffls.selectedFileFacets || [];
        let allFacets = ffls.fileFacets || [];

        // If the facet "fileFacet" is missing i.e. no fileFacet terms have been selected, then add the facet to the selectedFacets
        if ( !selectedFacets.some(facet => facet.name === "fileFormat") ) {

            let fileFacet = allFacets.find(facet => facet.name === "fileFormat");

            // Make a shallow copy of selectedFacets to modify fileFormat's selectedTerms
            const copyOfFacet = {...fileFacet};

            // Filter out matrix
            copyOfFacet.selectedTerms = copyOfFacet.terms.filter(term => term.name !== "matrix");
            selectedFacets.push(copyOfFacet as FileFacet);
        }

        // Remove the term "matrix" from selectedTerms
        selectedFacets = selectedFacets.map(selectedFacet => {

            if ( selectedFacet.name === "fileFormat" ) {

                // Make a shallow copy of selectedFacets to modify fileFormat's selectedTerms
                const copyOfFacet = {...selectedFacet};

                // Filter out matrix
                copyOfFacet.selectedTerms = copyOfFacet.selectedTerms.filter(term => term.name !== "matrix");
                return copyOfFacet as FileFacet;
            }

            return selectedFacet;
        });

        return this.terraDAO.exportToTerra(selectedFacets);
    }
}
