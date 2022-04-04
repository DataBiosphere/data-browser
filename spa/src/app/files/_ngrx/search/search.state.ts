/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of selected file facet terms and entities (projects) that comprise the current search state, as well as the
 * complete set of search terms that are selectable.
 */

// Core dependencies
import { isEqual } from "lodash-es";

// App dependencies
import { ClearSelectedAgeRangeAction } from "./clear-selected-age-range.action";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { ResponseTermService } from "../../http/response-term.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";
import { SearchEntity } from "../../search/search-entity.model";
import { SearchTermsUpdatedAction } from "./search-terms-updated.action";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { FacetAgeRangeName } from "../../facet/facet-age-range/facet-age-range-name.model";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchAgeRange } from "../../search/search-age-range.model";
import { SelectFacetAgeRangeAction } from "./select-facet-age-range.action";
import { FetchSelectedProjectsSuccessAction } from "./fetch-selected-projects-success.action";

export class SearchState {
    // Stringified version of the current set of selected search terms, used by analytics-related functionality
    public readonly currentQuery: string;

    // Set of possible search terms that are selectable
    public readonly searchTerms: SearchTerm[] = [];

    // Current set of search terms, keyed by facet/entity name
    public readonly selectedSearchTermsBySearchKey: Map<
        string,
        Set<SearchTerm>
    >;

    // Current set of selected search terms
    public readonly selectedSearchTerms: SearchTerm[];

    // True if selected search terms contain a project ID but no corresponding project name. This can occur on load
    // where a project ID is specified as a selected term in the URL; the URL contains the project ID but we must
    // separately query for the project name
    public readonly selectedSearchTermsLoading: boolean;

    // Stringified version of the previous set of selected search terms, used by analytics-related functionality
    public readonly previousQuery: string;

    private searchTermHttpService: SearchTermHttpService =
        new SearchTermHttpService(new ResponseTermService());

    /**
     * @param {SearchTerm[]} searchTerms
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsBySearchKey
     * @param {string} previousQuery
     */
    constructor(
        searchTerms: SearchTerm[],
        selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>,
        previousQuery: string
    ) {
        this.searchTerms = searchTerms;
        this.selectedSearchTermsBySearchKey = selectedSearchTermsBySearchKey;
        this.selectedSearchTerms = Array.from(
            this.selectedSearchTermsBySearchKey.values()
        ).reduce((accum, searchTermSet) => {
            accum = [...accum, ...Array.from(searchTermSet.values())];

            return accum;
        }, []);
        this.selectedSearchTermsLoading = this.isSelectedSearchTermsLoading(
            selectedSearchTermsBySearchKey
        );
        this.currentQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );
        this.previousQuery = previousQuery;
    }

    /**
     * Clear all selected search terms.
     *
     * @returns {SearchState}
     */
    public clearAllSelectedSearchTerms(): SearchState {
        const previousQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );
        return new SearchState([], new Map(), previousQuery);
    }

    /**
     * Handle clear of age range - remove age range from the set of selected search terms.
     *
     * @param {SelectFacetAgeRangeAction} action
     * @returns {SearchState}
     */
    public clearAgeRange(action: ClearSelectedAgeRangeAction): SearchState {
        const searchTerm = action.asSearchTerm();
        const updatedSearchTermsByFacetName =
            this.removeSearchTermFromSelectedSet(
                this.selectedSearchTermsBySearchKey,
                searchTerm
            );
        const previousQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );
        return new SearchState(
            this.searchTerms,
            updatedSearchTermsByFacetName,
            previousQuery
        );
    }

    /**
     * Patch the specified project values with the selected set of project terms. This is required on load if there
     * is a selected project specified in the URL; we must separately query for the project name, for display.
     */
    public patchSelectedProjectSearchTerms(
        action: FetchSelectedProjectsSuccessAction
    ): SearchState {
        const selectedSearchTermsBySearchKey = new Map(
            this.selectedSearchTermsBySearchKey
        );
        selectedSearchTermsBySearchKey.set(
            FileFacetName.PROJECT_ID,
            new Set(action.searchEntities)
        );
        return new SearchState(
            this.searchTerms,
            selectedSearchTermsBySearchKey,
            this.previousQuery
        );
    }

    /**
     * Handle select of age range - add age range to the set of selected search terms.
     *
     * @param {SelectFacetAgeRangeAction} action
     * @returns {SearchState}
     */
    public selectAgeRange(action: SelectFacetAgeRangeAction): SearchState {
        const searchTerm = action.asSearchTerm();
        const updatedSearchTermsByFacetName =
            this.replaceSearchTermInSelectedSet(
                this.selectedSearchTermsBySearchKey,
                searchTerm
            );
        const previousQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );
        return new SearchState(
            this.searchTerms,
            updatedSearchTermsByFacetName,
            previousQuery
        );
    }

    /**
     * Handle select/deselect of file facet term. Create new search state based on selected file facet term action.
     *
     * @param {SelectSearchTermAction} action
     * @returns {FacetState}
     */
    public selectSearchTerm(action: SelectSearchTermAction): SearchState {
        const previousQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );

        const searchTerm = action.asSearchTerm();
        if (action.selected) {
            const updatedSearchTermsByFacetName =
                this.addSearchTermToSelectedSet(
                    this.selectedSearchTermsBySearchKey,
                    searchTerm
                );
            return new SearchState(
                this.searchTerms,
                updatedSearchTermsByFacetName,
                previousQuery
            );
        }

        const updatedSearchTermsByFacetName =
            this.removeSearchTermFromSelectedSet(
                this.selectedSearchTermsBySearchKey,
                searchTerm
            );
        return new SearchState(
            this.searchTerms,
            updatedSearchTermsByFacetName,
            previousQuery
        );
    }

    /**
     * Handle select of search terms on init of app. App state is pulled from URL params and we must convert this to
     * a set of selected search terms, if any.
     *
     * @param {SetViewStateAction} action
     * @returns {SearchState}
     */
    public setSelectedSearchTermsFromViewState(
        action: SetViewStateAction
    ): SearchState {
        // Update new state with selected terms
        const selectedSearchTermsBySearchKey =
            action.selectedSearchTerms.reduce((accum, queryStringFacet) => {
                const facetName = queryStringFacet.facetName;
                const searchTerms =
                    this.translateQueryStringToSearchTerms(queryStringFacet);
                accum.set(facetName, searchTerms);
                return accum;
            }, new Map<string, Set<SearchTerm>>());

        // Determine loading state of search terms
        return new SearchState(
            this.searchTerms,
            selectedSearchTermsBySearchKey,
            ""
        );
    }

    /**
     * Set of possible search terms that use can select have been updated - update store.
     *
     * @param {SearchTermsUpdatedAction} action
     */
    public setSearchTerms(action: SearchTermsUpdatedAction) {
        const previousQuery = this.stringifySelectedSearchTerms(
            this.selectedSearchTerms
        );
        return new SearchState(
            action.searchTerms,
            this.selectedSearchTermsBySearchKey,
            previousQuery
        );
    }

    /**
     * Create default state of search - no selected file facet terms, no selected entities.
     *
     * @returns {SearchState}
     */
    public static getDefaultState() {
        return new SearchState([], new Map(), "");
    }

    /**
     * Add specified search term to set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private addSearchTermToSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
        selectedTerm: SearchTerm
    ): Map<string, Set<SearchTerm>> {
        const searchKey = selectedTerm.getSearchKey();

        // Add the newly selected search term to the set
        const updatedSearchTerms = new Set(
            searchTermsBySearchKey.get(searchKey)
        );
        updatedSearchTerms.add(selectedTerm);

        // Clone selected map for immutability and add updated set of selected terms for the specified facet
        const clonedTermsBySearchKey = new Map(searchTermsBySearchKey);
        clonedTermsBySearchKey.set(searchKey, updatedSearchTerms);
        return clonedTermsBySearchKey;
    }

    /**
     * Returns true if selected search term values are incomplete. That is, there is at least one selected project ID
     * that does not have a corresponding project name.
     *
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsBySearchKey
     * @returns {boolean}
     */
    private isSelectedSearchTermsLoading(
        selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>
    ): boolean {
        // If there's no selected project IDs, the search terms can be considered loaded.
        if (!selectedSearchTermsBySearchKey.has(FileFacetName.PROJECT_ID)) {
            return false;
        }

        // Check if there are any selected project IDs that haven't been associated with their corresponding project
        // name. If there are project IDs without a corresponding project name, selected search terms are considered
        // loading.
        const selectedProjectIds = selectedSearchTermsBySearchKey.get(
            FileFacetName.PROJECT_ID
        );
        return [...selectedProjectIds].some((selectedProject) => {
            return !selectedProject.getDisplayValue();
        });
    }

    /**
     * Build up the previous query from the current set of selected search terms.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     */
    private stringifySelectedSearchTerms(
        selectedSearchTerms: SearchTerm[]
    ): string {
        return this.searchTermHttpService.marshallSearchTerms(
            selectedSearchTerms
        );
    }

    /**
     * Remove the specified search term from the set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private removeSearchTermFromSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
        selectedTerm: SearchTerm
    ): Map<string, Set<SearchTerm>> {
        const searchKey = selectedTerm.getSearchKey();
        const currentSearchTerms = searchTermsBySearchKey.get(searchKey);

        // Error state - return current state if facet is not present in the set of selected facets.
        if (!currentSearchTerms) {
            return searchTermsBySearchKey;
        }

        // Remove the selected term for the current set of selected term
        let updatedSearchTerms = Array.from(currentSearchTerms).reduce(
            (accum, currentSearchTerm) => {
                if (!isEqual(currentSearchTerm, selectedTerm)) {
                    accum.add(currentSearchTerm);
                }

                return accum;
            },
            new Set<SearchTerm>()
        );

        // Clone selected map for immutability
        const clonedTermsByFacetName = new Map(searchTermsBySearchKey);

        // Remove facet from selected set if it has no corresponding selected terms.
        if (updatedSearchTerms.size === 0) {
            clonedTermsByFacetName.delete(searchKey);
        }
        // Otherwise, facet has other selected terms, set updated set!
        else {
            clonedTermsByFacetName.set(searchKey, updatedSearchTerms);
        }

        return clonedTermsByFacetName;
    }

    /**
     * Replace specified search term in set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private replaceSearchTermInSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
        selectedTerm: SearchTerm
    ): Map<string, Set<SearchTerm>> {
        const searchKey = selectedTerm.getSearchKey();

        // Replace the newly selected search term in the set
        const updatedSearchTerms = new Set<SearchTerm>();
        updatedSearchTerms.add(selectedTerm);

        // Clone selected map for immutability and add updated set of selected terms for the specified facet
        const clonedTermsBySearchKey = new Map(searchTermsBySearchKey);
        clonedTermsBySearchKey.set(searchKey, updatedSearchTerms);
        return clonedTermsBySearchKey;
    }

    /**
     * Translate query string search terms to set of selected search terms.
     *
     * @param {QueryStringSearchTerm} queryStringSearchTerm
     * @returns {Set<SearchTerm>}
     */
    private translateQueryStringToSearchTerms(
        queryStringSearchTerm: QueryStringSearchTerm
    ): Set<SearchTerm> {
        const searchKey = queryStringSearchTerm.facetName;
        return queryStringSearchTerm.value.reduce((accum, searchValue) => {
            if (searchKey === FileFacetName.PROJECT_ID) {
                accum.add(new SearchEntity(searchKey, searchValue, ""));
            } else if (searchKey === FacetAgeRangeName.ORGANISM_AGE_RANGE) {
                accum.add(new SearchAgeRange(searchKey, searchValue));
            } else {
                accum.add(new SearchFacetTerm(searchKey, searchValue));
            }

            return accum;
        }, new Set<SearchTerm>());
    }
}
