/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Dictionary } from "../../dictionary";
import { EntityName } from "./entity-name.model";
import { EntitySearchResults } from "./entity-search-results.model";
import { FilesAPIResponse } from "./files-api-response.model";
import { FileFormat } from "./file-format.model";
import { FacetTermsResponse } from "./facet-terms-response.model";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileSummary } from "../file-summary/file-summary";
import { GenusSpecies } from "./genus-species.model";
import { LibraryConstructionApproach } from "./library-construction-approach.model";
import { MatrixableFileFacets } from "./matrixable-file-facets.model";
import { PairedEnd } from "./paired-end.model";
import { SearchTermService } from "./search-term.service";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";
import { Term } from "./term.model";
import { TermResponse } from "./term-response.model";
import { TermResponseService } from "./term-response.service";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";

@Injectable()
export class FilesService {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermService} searchTermService
     * @param {TermResponseService} termResponseService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private searchTermService: SearchTermService,
                private termResponseService: TermResponseService,
                private httpClient: HttpClient) {
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg samples, files), as
     * well as facet terms and their corresponding counts. See fetchProjectSearchResults for projects tab.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                    tableParams: TableParamsModel,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {

        // Build API URL
        const url = this.buildEntitySearchResultsUrl(selectedEntity);

        // Build up param map
        let paramMap;
        if ( filterableByProject ) {
            paramMap = this.buildFetchSearchResultsQueryParams(searchTermsBySearchKey, tableParams);
        }
        else {
            const filteredSearchTerms = this.removeProjectSearchTerms(searchTermsBySearchKey, selectedEntity);
            paramMap = this.buildFetchSearchResultsQueryParams(filteredSearchTerms, tableParams);
        }

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap})
            .pipe(
                map((apiResponse: FilesAPIResponse) =>
                    this.bindEntitySearchResultsResponse(apiResponse, searchTermsBySearchKey, selectedEntity))
            );
    }

    /**
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} selectedSearchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        // Build up API URL
        const url = this.configService.buildApiUrl(`/repository/summary`);

        // Build up the query params
        const filters = this.searchTermService.marshallSearchTerms(searchTerms);

        return this.httpClient.get<FileSummary>(url, {
            params: {
                filters
            }
        }).pipe(
            map(this.bindFileSummaryResponse)
        );
    }

    /**
     * Returns true if there is matrixable data for the current search terms. Query FILES endpoint with the current
     * search terms, updating the file type to only matrix if necessary.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @returns {Observable<MatrixableSearchResults>}
     */
    public fetchIsMatrixSupported(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                  tableParams: TableParamsModel): Observable<boolean> {

        return this.fetchIsMatrixSupportedFilesAPIResponse(searchTermsBySearchKey, tableParams).pipe(
            map((apiResponse: FilesAPIResponse) => !this.bindIsEmptySetResponse(apiResponse))
        );
    }

    /**
     * Returns true if the matrix partial query is true. A matrix partial query is true when not all of the data for
     * the current search terms will be included in a matrix. A matrix partial query is false when all of the data for
     * the current search terms will be included in a matrix.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @returns {Observable<boolean>}
     */
    public fetchIsMatrixPartialQueryMatch(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                          tableParams: TableParamsModel): Observable<boolean> {


        return this.fetchIsMatrixPartialQueryMatchFilesAPIResponse(searchTermsBySearchKey, tableParams).pipe(
            map((apiResponse: FilesAPIResponse) =>
                this.bindMatrixableFileFacetsResponse(apiResponse, searchTermsBySearchKey)),
            switchMap((matrixableFileFacets: MatrixableFileFacets) =>
                this.isMatrixPartialQueryMatch(searchTermsBySearchKey, tableParams, matrixableFileFacets))
        );
    }

    /**
     * Returns true if there is data for the specified search terms, but additionally restricting the library construction
     * approach to just smart seq 2.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @returns {Observable<boolean>}
     */
    private fetchIsSmartSeq2False(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                  tableParams: TableParamsModel): Observable<boolean> {

        // Build API URL
        const url = this.buildEntitySearchResultsUrl(EntityName.FILES);

        // Clear out any library construction approaches other than smart seq 2
        const ss2SearchTerms = this.createSmartSeq2SearchTerms(searchTermsBySearchKey);
        const paramMap = this.buildFetchSearchResultsQueryParams(ss2SearchTerms, tableParams);

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap})
            .pipe(
                map((apiResponse: FilesAPIResponse) =>
                    this.bindIsPairedEndFalseResponse(apiResponse, searchTermsBySearchKey))
            );
    }

    /**
     * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
     * total file size count if applicable.
     *
     * @param {FileSummary} fileSummary
     * @returns {FileSummary}
     */
    private bindFileSummaryResponse(fileSummary: FileSummary): FileSummary {

        const totalFileSize = (typeof fileSummary.totalFileSize === "string") ? 0 : fileSummary.totalFileSize;
        return Object.assign({}, fileSummary, {totalFileSize});
    }

    /**
     * Parse the API response and build up entity search results.
     *
     * @param {FilesAPIResponse} apiResponse
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {string} selectedEntity
     * @returns {EntitySearchResults}
     */
    private bindEntitySearchResultsResponse(apiResponse: FilesAPIResponse,
                                            searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                            selectedEntity: string): EntitySearchResults {

        const fileFacets = this.bindFileFacets(searchTermsBySearchKey, apiResponse.termFacets);
        const termCountsByFacetName = this.mapTermCountsByFacetName(fileFacets);
        const searchTerms = this.searchTermService.bindSearchTerms(apiResponse.termFacets);

        const tableModel = {
            data: apiResponse.hits,
            pagination: apiResponse.pagination,
            tableName: selectedEntity,
            termCountsByFacetName
        };

        return {
            fileFacets,
            searchTerms,
            tableModel
        };
    }

    /**
     * Map files API response into FileFacet objects, maintaining selected state of terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {Dictionary<FacetTermsResponse>} termFacets
     * @returns {FileFacet[]}
     */
    private bindFileFacets(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>,
        termFacets: Dictionary<FacetTermsResponse>): FileFacet[] {

        return Object.keys(termFacets).map((facetName) => {

            const responseFileFacet = termFacets[facetName];

            // Determine the set of currently selected search term names for this facet
            const searchTermNames = this.listFacetSearchTermNames(facetName, searchTermsByFacetName);

            // Build up the list of terms from the facet response
            const responseTerms = this.bindFileFacetTerms(facetName, responseFileFacet.terms, searchTermNames);

            // Create file facet from newly built terms and newly calculated total
            return new FileFacet(facetName, (responseFileFacet.total || 0), responseTerms);
        });
    }

    /**
     * Create a set of terms from the terms returned in the response. Maintain selected state of terms from current set
     * of search terms.
     *
     * @param {string} facetName
     * @param {TermResponse[]} termResponses
     * @param {string[]} searchTermNames
     * @returns {Term[]}
     */
    private bindFileFacetTerms(facetName: string, termResponses: TermResponse[], searchTermNames: string[]): Term[] {

        return termResponses.reduce((accum, termResponse: TermResponse) => {

            // Default term name to "Unspecified" if term name is null
            const termName = this.termResponseService.bindTermName(termResponse);

            // Determine if term is currently selected as a search term
            let selected = searchTermNames.indexOf(termName) >= 0;

            // Create new term - default name to "Unspecified" if no value is returned
            const term = new Term(termName, termResponse.count, selected);
            accum.push(term);

            return accum;
        }, []);
    }

    /**
     * Returns true if there are no hits in the specified API response.
     *
     * @param {FilesAPIResponse} apiResponse
     * @returns {boolean}
     */
    private bindIsEmptySetResponse(apiResponse: FilesAPIResponse): boolean {

        return apiResponse.hits.length === 0;
    }

    /**
     * Returns the set of file facets that are applicable to determining the matrix partial query status. The status is
     * either partial (ie there is data that wont be included in the matrix), or complete (ie all data is included in the
     * matrix).
     *
     * @param {FilesAPIResponse} apiResponse
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * searchTermsBySearchKey: Map<string, Set<SearchTerm>>
     * @returns {MatrixableFileFacets}
     */
    private bindMatrixableFileFacetsResponse(apiResponse: FilesAPIResponse, searchTermsBySearchKey: Map<string, Set<SearchTerm>>): MatrixableFileFacets {

        const fileFacets = this.bindFileFacets(searchTermsBySearchKey, apiResponse.termFacets);
        const fileFacetsByName = fileFacets.reduce((accum, fileFacet) => {
            accum.set(fileFacet.name, fileFacet);
            return accum;
        }, new Map<string, FileFacet>());

        return {
            genusSpecies: fileFacetsByName.get(FileFacetName.GENUS_SPECIES),
            libraryConstructionApproaches: fileFacetsByName.get(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH),
            pairedEnds: fileFacetsByName.get(FileFacetName.PAIRED_END)
        };
    }

    /**
     * Returns true if the only paired end returned is TRUE.
     *
     * @param {FilesAPIResponse} apiResponse
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * searchTermsBySearchKey: Map<string, Set<SearchTerm>>
     * @returns {MatrixableFileFacets}
     */
    private bindIsPairedEndFalseResponse(apiResponse: FilesAPIResponse, searchTermsBySearchKey: Map<string, Set<SearchTerm>>): boolean {

        const fileFacets = this.bindFileFacets(searchTermsBySearchKey, apiResponse.termFacets);
        const pairedEnd = fileFacets.find(facet => facet.name === FileFacetName.PAIRED_END);
        return !pairedEnd.isOnlySelectedTerm(PairedEnd.TRUE);
    }

    /**
     * Build the entity search results end point URL.
     *
     * @param {string} entity
     * @returns {string}
     */
    private buildEntitySearchResultsUrl(entity: string): string {

        return this.configService.buildApiUrl(`/repository/${entity}`);
    }

    /**
     * Build up set of query params for fetching search results.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     */
    private buildFetchSearchResultsQueryParams(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, tableParams: TableParamsModel) {

        // Build query params
        const searchTermSets = searchTermsBySearchKey.values();
        const searchTerms = Array.from(searchTermSets).reduce((accum, searchTermSet) => {
            return accum.concat(Array.from(searchTermSet));
        }, []);
        const filters = this.searchTermService.marshallSearchTerms(searchTerms);

        const paramMap = {
            filters,
            size: tableParams.size.toString(10)
        };

        if ( tableParams.sort && tableParams.order ) {
            paramMap["sort"] = tableParams.sort;
            paramMap["order"] = tableParams.order;
        }

        // check if there is paging
        if ( tableParams.search_after && tableParams.search_after_uid ) {

            paramMap["search_after"] = tableParams.search_after;
            paramMap["search_after_uid"] = tableParams.search_after_uid;
        }

        if ( tableParams.search_before && tableParams.search_before_uid ) {

            paramMap["search_before"] = tableParams.search_before;
            paramMap["search_before_uid"] = tableParams.search_before_uid;
        }

        return paramMap;
    }

    /**
     * Remove all file types other than matrix.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private createMatrixPartialQuerySearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>): Map<string, Set<SearchTerm>> {

        const searchTerms = new Map(searchTermsByFacetName);
        const currentFileFormats = searchTerms.get(FileFacetName.FILE_FORMAT) || [];
        const fileFormats = Array.from(currentFileFormats).reduce((accum, searchTerm) => {
            if ( searchTerm.getSearchValue() === FileFormat.MATRIX ) {
                accum.add(searchTerm);
            }
            return accum;
        }, new Set());
        if ( fileFormats.size ) {
            searchTerms.set(FileFacetName.FILE_FORMAT, fileFormats);
        }
        else {
            searchTerms.delete(FileFacetName.FILE_FORMAT);
        }
        return searchTerms;
    }

    /**
     * Remove all file types other than matrix.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private createMatrixSupportedSearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>): Map<string, Set<SearchTerm>> {

        const searchTerms = new Map(searchTermsByFacetName);
        searchTerms.set(FileFacetName.FILE_FORMAT, new Set([
            new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
        ]));
        return searchTerms;
    }

    /**
     * Remove all library construction approaches other than smart seq 2. Add smart seq 2 if not already selected.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private createSmartSeq2SearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>): Map<string, Set<SearchTerm>> {

        const ss2SearchTerms = new Map(searchTermsByFacetName);
        ss2SearchTerms.set(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, new Set([
            new SearchFileFacetTerm(FileFacetName.LIBRARY_CONSTRUCTION_APPROACH, LibraryConstructionApproach.SMART_SEQ2)
        ]));
        return ss2SearchTerms;
    }

    /**
     * Fetch the matrixable data for the current search terms, if any. Query FILES endpoint with the current search
     * terms, removing all selected file formats except matrix.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @returns {Observable<MatrixableSearchResults>}
     */
    private fetchIsMatrixPartialQueryMatchFilesAPIResponse(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                                           tableParams: TableParamsModel): Observable<FilesAPIResponse> {

        // Build API URL
        const url = this.buildEntitySearchResultsUrl(EntityName.FILES);

        // Update search terms such that only selected file type is matrix
        const matrixSearchTerms = this.createMatrixPartialQuerySearchTerms(searchTermsBySearchKey);
        const paramMap = this.buildFetchSearchResultsQueryParams(matrixSearchTerms, tableParams);

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap});
    }

    /**
     * Fetch the matrixable data for the current search terms, if any. Query FILES endpoint with the current search
     * terms, updating the file type to only matrix if necessary.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @returns {Observable<MatrixableSearchResults>}
     */
    private fetchIsMatrixSupportedFilesAPIResponse(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                                   tableParams: TableParamsModel): Observable<FilesAPIResponse> {

        // Build API URL
        const url = this.buildEntitySearchResultsUrl(EntityName.FILES);

        // Update search terms such that only selected file type is matrix
        const matrixSearchTerms = this.createMatrixSupportedSearchTerms(searchTermsBySearchKey);
        const paramMap = this.buildFetchSearchResultsQueryParams(matrixSearchTerms, tableParams);

        return this.httpClient
            .get<FilesAPIResponse>(url, {params: paramMap});
    }

    /**
     * Returns true if not all of the data for the current set of search terms is matrixable and is therefore considered
     * a partial query match. Returns observable as we may need to execute an additional query to the backend to
     * determine partial query match status.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @param {MatrixableFileFacets} matrixableFileFacets
     * @returns {Observable<boolean>}
     */
    private isMatrixPartialQueryMatch(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                      tableParams: TableParamsModel,
                                      matrixableFileFacets: MatrixableFileFacets): Observable<boolean> {

        // Check if an additional query is required to determine if smart seq 2 / false is a combination in
        // the current data. We currently can not determine the association between a library construction
        // approach and a paired end, so we do this manually here.

        // If there is anything other human selected for species, then we don't need to do any additional
        // checks. We know at this point that the matrix partial query match is going to be partial. 
        if ( this.isGenusSpeciesPartialQueryMatch(matrixableFileFacets.genusSpecies) ) {
            return of(true);
        }

        // Check the library construction approach. If we have anything other than smart seq 2, 10x v2 or
        // 10x 3' v2 then we know it's a partial match.
        const libraryConstructionApproaches = matrixableFileFacets.libraryConstructionApproaches;
        if ( !this.isValidMatrixLibraryConstructionApproach(libraryConstructionApproaches) ) {
            return of(true);
        }

        // If we have only 10x v2 or 10x 3' v2 selected, then it's not a partial match.
        if ( libraryConstructionApproaches.isOnlySelectedTerm(
            LibraryConstructionApproach.TENX_V2, LibraryConstructionApproach.TENX_3PRIME_V2) ) {
            return of(false);
        }

        // We have smart seq 2 in the mix. If we only have paired end true, we know it's not a partial match.
        if ( !this.isPairedEndPartialQueryMatch(matrixableFileFacets.pairedEnds) ) {
            return of(false);
        }

        // We could potentially have a partial query match and therefore need to execute the additional
        // query to determine if there are any smart seq 2 / paired end false combinations in the data.
        return this.fetchIsSmartSeq2False(searchTermsBySearchKey, tableParams);
    }

    /**
     * Returns true if there is a genus species value other than homo sapiens
     *
     * @param {FileFacet} genusSpecies
     * @returns {boolean}
     */
    private isGenusSpeciesPartialQueryMatch(genusSpecies: FileFacet): boolean {

        return !genusSpecies.isOnlySelectedTerm(GenusSpecies.HOMO_SAPIENS);
    }

    /**
     * Returns true if the only selected or specified library construction approaches are valid for generating matrix.
     * Specifically, library construction approach must be one of:
     * 1. Smart seq 2
     * 2. 10x v2
     * 3. 10x 3' v2
     */
    private isValidMatrixLibraryConstructionApproach(libraryConstructionApproaches: FileFacet): boolean {

        return libraryConstructionApproaches.isOnlySelectedTerm(
            LibraryConstructionApproach.SMART_SEQ2,
            LibraryConstructionApproach.TENX_V2,
            LibraryConstructionApproach.TENX_3PRIME_V2);
    }

    /**
     * Returns true if there is a paired end value of than true
     *
     * @param {FileFacet} pairedEnds
     * @returns {boolean}
     */
    private isPairedEndPartialQueryMatch(pairedEnds: FileFacet): boolean {

        return !pairedEnds.isOnlySelectedTerm(PairedEnd.TRUE)
    }

    /**
     * Return the set of search terms for the specified facet, if any.
     *
     * @param {string} facetName
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @returns {string[]}
     */
    private listFacetSearchTermNames(facetName: string, searchTermsBySearchKey: Map<string, Set<SearchTerm>>): string[] {

        const searchTermSet: Set<SearchTerm> = searchTermsBySearchKey.get(facetName);
        return searchTermSet ?
            Array.from(searchTermSet.values()).map((searchTerm) => searchTerm.getName()) :
            [];
    }

    /**
     * Create map of terms counts for each file facet, keyed by the file facet name.
     *
     * @param {FileFacet[]} fileFacets
     */
    private mapTermCountsByFacetName(fileFacets: FileFacet[]): Map<string, number> {

        return Array.from(fileFacets).reduce((accum, fileFacet: FileFacet) => {

            const termCount = fileFacet.selectedTermCount > 0 ? fileFacet.selectedTermCount : fileFacet.termCount;
            accum.set(fileFacet.name, termCount);
            return accum;
        }, new Map<string, number>());
    }

    /**
     * Remove project facet and/or project IDs from list of search terms as we do not want to restrict the table result
     * set to just the selected project.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {string} selectedEntity
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private removeProjectSearchTerms(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, selectedEntity: string): Map<string, Set<SearchTerm>> {

        const filteredSearchTerms = new Map(searchTermsByFacetName);
        filteredSearchTerms.delete(FileFacetName.PROJECT);
        filteredSearchTerms.delete(FileFacetName.PROJECT_ID);
        return filteredSearchTerms;
    }
}
