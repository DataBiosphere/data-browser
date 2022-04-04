/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of state backing file manifest downloads for both selected data and project files downloads.
 */

// App dependencies
import { ClearFileManifestUrlAction } from "./clear-file-manifest-url.action";
import { Facet } from "../../facet/facet.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FetchFileManifestFileTypeSummariesSuccessAction } from "./fetch-file-manifest-file-type-summaries-success.action";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { FetchProjectFileSummarySuccessAction } from "./fetch-project-file-summary-success.actions";
import { FetchProjectSpeciesFacetSuccessAction } from "./fetch-project-species-facet-success.action";
import { FileManifest } from "./file-manifest.model";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileSummary } from "../../file-summary/file-summary.model";
import { FileSummaryState } from "../file-summary/file-summary.state";
import { FileTypeSummary } from "../../file-summary/file-type-summary.model";
import { FetchFilesFacetsSuccessAction } from "./fetch-files-facets-success.action";
import { SearchTerm } from "../../search/search-term.model";
import { SelectProjectFileFacetTermAction } from "./select-project-file-facet-term.action";

const DEFAULT_FILE_MANIFEST_STATE = {
    filesFacets: [],
    fileTypeSummaries: [],
    manifestResponse: {
        status: ManifestStatus.NOT_STARTED,
    } as ManifestResponse,
    projectFileSummary: {} as FileSummary,
    projectSpeciesFacet: {} as Facet,
    selectedProjectSearchTerms: [],
};

export class FileManifestState {
    public readonly filesFacets: Facet[]; // Set of facets from files endpoint
    public readonly fileTypeSummaries: FileTypeSummary[];
    public readonly manifestResponse: ManifestResponse;
    public readonly projectFileSummary: FileSummary;
    public readonly projectSpeciesFacet: Facet;
    public readonly selectedProjectSearchTerms: SearchTerm[];

    /**
     * @param {FileManifestState} state
     */
    constructor(state: FileManifest = DEFAULT_FILE_MANIFEST_STATE) {
        Object.assign(this, state);
    }

    /**
     * Clear the files facets (facets fetched from files endpoint and displayed on get data pages).
     *
     * @returns {FileManifestState}
     */
    public clearFilesFacets(): FileManifestState {
        return new FileManifestState({
            filesFacets: [],
            fileTypeSummaries: this.fileTypeSummaries,
            manifestResponse: this.manifestResponse,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * File manifest request has been cancelled (for example, from navigation away from download); clear corresponding
     * state.
     *
     * @param {ClearFileManifestUrlAction} action
     */
    public clearFileManifestUrl(action: ClearFileManifestUrlAction) {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: {
                status: ManifestStatus.NOT_STARTED,
            } as ManifestResponse,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * File manifest request has been cancelled (for example, from navigation away from download); clear corresponding
     * state.
     */
    public clearFileTypeSummaries() {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: [],
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * Handle set of file facets returned from the files end point, used to populate data summary.
     *
     * @param {FetchFilesFacetsSuccessAction} action
     * @returns {FileManifestState}
     */
    public receiveFilesFacets(
        action: FetchFilesFacetsSuccessAction
    ): FileManifestState {
        return new FileManifestState({
            filesFacets: action.filesFacets,
            fileTypeSummaries: this.fileTypeSummaries,
            manifestResponse: this.manifestResponse,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * Manifest URL request response has been received from server. This does not necessarily mean the request has
     * completed; the status of the response could be "in progress" with the corresponding retry URL (and not the final
     * export URL).
     *
     * @param {FetchFileManifestUrlSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchFileManifestUrlSuccess(
        action: FetchFileManifestUrlSuccessAction
    ) {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: action.response,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * File summary has been requested - return current state.
     *
     * @returns {FileSummaryState}
     */
    public fetchFileTypeSummariesRequest(): FileManifestState {
        return this;
    }

    /**
     * File type summaries has been successfully requested from the server - return updated state.
     *
     * @param {FetchFileManifestFileTypeSummariesSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchFileTypeSummariesSuccess(
        action: FetchFileManifestFileTypeSummariesSuccessAction
    ) {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: action.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }
    /**
     * Project-specific file summary has been successfully requested from the server - return updated state.
     *
     * @param {FetchFileManifestFileTypeSummariesSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchProjectFileSummary(
        action: FetchProjectFileSummarySuccessAction
    ) {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: action.fileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * Handle select/deselect of facet term.
     *
     * @param {SelectProjectFileFacetTermAction} action
     * @returns {FacetState}
     */
    public selectTerm(
        action: SelectProjectFileFacetTermAction
    ): FileManifestState {
        const facetName = action.facetName;
        const termName = action.termName;

        return new FileManifestState({
            filesFacets: this.updateFacetsOnTermSelected(facetName, termName),
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: this.projectSpeciesFacet,
            selectedProjectSearchTerms: this.updateSearchTermsOnTermSelected(
                action.asSearchTerm(),
                action.selected
            ),
        });
    }

    /**
     * Set the number of species for the selected project.
     *
     * @param {SelectProjectFileFacetTermAction} action
     * @returns {FacetState}
     */
    public setProjectSpeciesFacet(
        action: FetchProjectSpeciesFacetSuccessAction
    ): FileManifestState {
        return new FileManifestState({
            filesFacets: this.filesFacets,
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary,
            projectSpeciesFacet: action.speciesFacet,
            selectedProjectSearchTerms: this.selectedProjectSearchTerms,
        });
    }

    /**
     * @returns {FileManifestState}
     */
    public static getDefaultState() {
        return new FileManifestState();
    }

    /**
     * Term has been selected: build updated set of facets.
     *
     * @param {string} facetName
     * @param {string} termName
     * @returns {Facet[]}
     */
    private updateFacetsOnTermSelected(
        facetName: string,
        termName: string
    ): Facet[] {
        return this.filesFacets.reduce((accum, f) => {
            // Ignore facets that aren't file facets, or file facets that aren't the selected facet.
            if (!(f instanceof FileFacet) || f.name !== facetName) {
                accum.push(f);
            }
            // Otherwise update the selected value of the selected term.
            else {
                accum.push(f.selectTerm(termName));
            }

            return accum;
        }, []);
    }

    /**
     * Term has been selected: build updated set of search terms.
     *
     * @param {SearchTerm} searchTerm
     * @param {boolean} selected
     * @returns {SearchTerm[]}
     */
    private updateSearchTermsOnTermSelected(
        searchTerm: SearchTerm,
        selected: boolean
    ): SearchTerm[] {
        // Handle case where search term is being added to set.
        if (selected) {
            return [...this.selectedProjectSearchTerms, searchTerm];
        }

        // Handle case where search term is being removed from set.
        return this.selectedProjectSearchTerms.filter((toFilter) => {
            return !(
                toFilter.getSearchKey() === searchTerm.getSearchKey() &&
                toFilter.getSearchValue() === searchTerm.getSearchValue()
            );
        });
    }
}
