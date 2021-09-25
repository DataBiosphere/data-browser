/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of facet state and related selected facet terms states. Facet state includes all facet types: file facets a 
 * well as age range facets.
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FacetAgeRangeName } from "../../facet/facet-age-range/facet-age-range-name.model";
import { FacetAgeRange } from "../../facet/facet-age-range/facet-age-range.model";
import { AgeRange } from "../../facet/facet-age-range/age-range.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FetchFilesFacetsSuccessAction } from "./fetch-files-facets-success.action";
import { FetchFacetsSuccessAction } from "./fetch-facets-success-action.action";
import { ClearSelectedAgeRangeAction } from "../search/clear-selected-age-range.action";
import { SelectFacetAgeRangeAction } from "../search/select-facet-age-range.action";
import { SelectFileFacetTermAction } from "../search/select-file-facet-term.action";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { SetViewStateAction } from "./set-view-state.action";
import { Term } from "../../shared/term.model";
import { Pagination } from "../../table/pagination/pagination.model";

export class FacetState {

    public readonly facets: Facet[];
    public readonly fileFacets: FileFacet[]; // Subset of facets, containing only facets of type file facet
    public readonly filesFacets: Facet[]; // Set of facets from files endpoint, used to display facet values on get data flow
    public readonly selectedFacet: Facet; // Facet currently being edited.
    public readonly paginationModel: Pagination;

    private readonly facetNames: string[];
    private readonly facetsByName: Map<string, Facet>;

    /**
     * @param {string[]} facetNames
     * @param {Map<string, Facet>} facetsByName
     * @param {Facet[]} filesFacets
     * @param {Facet} selectedFacet
     * @param {Pagination} paginationModel
     */
    constructor(facetNames: string[],
                facetsByName: Map<string, Facet>,
                filesFacets: Facet[],
                selectedFacet: Facet,
                paginationModel: Pagination) {

        this.facetNames = facetNames;
        this.facetsByName = facetsByName; // Facets specifically fetched from files endpoint, used for displaying data summary on get data functionality 
        this.filesFacets = filesFacets;
        this.selectedFacet = selectedFacet;
        
        // TODO set default pagination model if undefined
        this.paginationModel = paginationModel;

        this.facets = this.facetNames.map((facetName) => {
            return this.facetsByName.get(facetName);
        });
        
        // Set up subset of facets containing only file facets.
        this.fileFacets = this.facets.filter(facet => facet instanceof FileFacet) as FileFacet[];
    }

    /**
     * Create default state of file facet list - empty list of file facets, no selected facets, no pagination state.
     *
     * @returns {FacetState}
     */
    public static getDefaultState() {
        return new FacetState(
            [],
            new Map<string, FileFacet>(),
            [],
            undefined,
            undefined);
    }

    /**
     * Clear the specified age range.
     * 
     * @returns {FacetState}
     */
    public clearAgeRange(action: ClearSelectedAgeRangeAction): FacetState {

        const facetName = action.facetName;

        // Get current state of facet
        const newSelectedFacet = this.facetsByName.get(facetName);

        const fileFacetsByName = new Map<string, Facet>();
        this.facetsByName.forEach((f) => {

            // Ignore facets that aren't file facets, or file facets that aren't the selected facet
            if ( f.name === facetName) {
                fileFacetsByName.set(f.name, (f as FacetAgeRange).clearAgeRange());
            }
            else {
                fileFacetsByName.set(f.name, f);
            }
        });

        // Update selected file facet - check if user has selected a term from a facet different from the previously
        // selected term and if so, update the selected facet.
        const selectedFacet = this.determineSelectedFacet(this.selectedFacet, newSelectedFacet);

        return new FacetState(
            this.facetNames, fileFacetsByName, this.filesFacets, selectedFacet, this.paginationModel);
    }

    /**
     * Clear the files facets (facets fetched from files endpoint and displayed on get data pages).
     *
     * @returns {FacetState}
     */
    public clearFilesFacets(): FacetState {

        return new FacetState(
            this.facetNames, this.facetsByName, [], this.selectedFacet, this.paginationModel);
    }

    /**
     * Return model of the current state of the file facet list (including pagination)
     *
     * @returns {FacetState}
     */
    public requestFileFacets(): FacetState {

        return new FacetState(
            this.facetNames, this.facetsByName, this.filesFacets, this.selectedFacet, this.paginationModel);
    }

    /**
     * Handle updated list of fileFacets that have been returned from the server end point.
     *
     * @param {FetchFacetsSuccessAction} action
     * @returns {FacetState}
     */
    public receiveFileFacets(action: FetchFacetsSuccessAction): FacetState {

        return new FacetState(
            FacetState.createFacetNames(action.facets),
            FacetState.createFacetsMap(action.facets),
            this.filesFacets,
            this.selectedFacet,
            this.paginationModel);
    }

    /**
     * Handle set of file facets returned from the files end point, used to populate data summary on get data pages.
     *
     * @param {SelectFacetAgeRangeAction} action
     * @returns {FacetState}
     */
    public receiveFilesFacets(action: FetchFilesFacetsSuccessAction): FacetState {

        return new FacetState(
            this.facetNames,
            this.facetsByName,
            action.fileFileFacets,
            this.selectedFacet,
            this.paginationModel);
    }

    /**
     * Handle select/deselect of facet term - create new file facet list state based on selected facet (term) action.
     *
     * @param {SelectFileFacetTermAction} action
     * @returns {FacetState}
     */
    public selectTerm(action: SelectFileFacetTermAction): FacetState {

        const facetName = action.facetName;
        const termName = action.getTermKey();

        // Get current state of facet
        const newSelectedFacet = this.facetsByName.get(facetName);

        // Error case - just return the current state.
        if ( !newSelectedFacet ) {
            return this;
        }

        // Update selected indicator on selected term - find the facet with the term that was selected and update term's
        // selected flag.
        const fileFacetsByName = new Map<string, Facet>();
        this.facetsByName.forEach((f) => {
            
            // Ignore facets that aren't file facets, or file facets that aren't the selected facet
            if ( !(f instanceof FileFacet) || f.name !== facetName) {
                fileFacetsByName.set(f.name, f);
            }
            else {
                fileFacetsByName.set(f.name, f.selectTerm(termName));
            }

        });

        // Update selected file facet - check if user has selected a term from a facet different from the previously
        // selected term and if so, update the selected facet.
        const selectedFacet = this.determineSelectedFacet(this.selectedFacet, newSelectedFacet);

        // Return new state of file facet list (ie with newly selected/deselected term and potentially newly selected
        // facet).
        return new FacetState(
            this.facetNames, fileFacetsByName, this.filesFacets, selectedFacet, this.paginationModel);
    }

    /**
     * Handle set of age range facet.
     * 
     * @param {SelectFacetAgeRangeAction} action
     * @returns {FacetState}
     */
    public setAgeRange(action: SelectFacetAgeRangeAction): FacetState {

        const facetName = action.facetName;

        // Get current state of facet
        const newSelectedFacet = this.facetsByName.get(facetName);
        
        const fileFacetsByName = new Map<string, Facet>();
        this.facetsByName.forEach((f) => {

            // Ignore facets that aren't file facets, or file facets that aren't the selected facet
            if ( f.name === facetName) {
                fileFacetsByName.set(f.name, (f as FacetAgeRange).setAgeRange(action.ageRange));
            }
            else {
                fileFacetsByName.set(f.name, f);
            }
        });

        // Update selected file facet - check if user has selected a term from a facet different from the previously
        // selected term and if so, update the selected facet.
        const selectedFacet = this.determineSelectedFacet(this.selectedFacet, newSelectedFacet);
        
        return new FacetState(
            this.facetNames, fileFacetsByName, this.filesFacets, selectedFacet, this.paginationModel);
    }

    /**
     * Handle select of facet values on init of app. App state is pulled from URL params and we must convert this to
     * a set of selected facet terms or age ranges, if any.
     *
     * @param {SetViewStateAction} action
     * @returns {FacetState}
     */
    public setSelectedFacetTermsFromViewState(action: SetViewStateAction): FacetState {

        // Update new state with selected terms
        const selectedFacetStates = action.selectedSearchTerms;

        // Create file facet names
        const fileFacetNames = selectedFacetStates.map((selectedFacetState: QueryStringSearchTerm) => {
            return selectedFacetState.facetName;
        });

        // Create facets from query string search terms, and add to map
        const fileFacetsMap = selectedFacetStates.reduce((accum, queryStringSearchTerm: QueryStringSearchTerm) => {

            const facetName = queryStringSearchTerm.facetName;
            if ( queryStringSearchTerm.facetName === FacetAgeRangeName.ORGANISM_AGE_RANGE ) {
                accum.set(facetName, this.buildFacetAgeRangeFromQueryString(queryStringSearchTerm));
            }
            else {
                accum.set(facetName, this.buildFileFacetFromQueryString(queryStringSearchTerm));
                
            }

            return accum;
        }, new Map<string, Facet>());

        return new FacetState(fileFacetNames, fileFacetsMap, [],null, null);
    }
    
    /*
     * Build facet age range from query string search term.
     * 
     * @param {QueryStringSearchTerm} queryStringSearchTerm
     * @returns {FacetAgeRange}
     */
    private buildFacetAgeRangeFromQueryString(queryStringSearchTerm: QueryStringSearchTerm): FacetAgeRange {

        // We currently only support a single age range.
        return new FacetAgeRange(queryStringSearchTerm.facetName, queryStringSearchTerm.value[0] as AgeRange);
    }

    /**
     * Build file facet from query string search term.
     *
     * @param {QueryStringSearchTerm} queryStringSearchTerm
     * @returns {FileFacet}
     */
    private buildFileFacetFromQueryString(queryStringSearchTerm: QueryStringSearchTerm): FileFacet {

        // Create the terms for this file facet. Term has been specified in the URL as selected so set the selected
        // flag accordingly.
        const terms = queryStringSearchTerm.value.map((termName: string) => {
            return new Term(termName, 0, true);
        });

        // Create the file facet, set total and short list length to 0; these values will be updated on the initial
        // request of file facet data from the server.
        return new FileFacet(queryStringSearchTerm.facetName, 0, terms);
    }

    /**
     * Convert array of facets into a map of facets keyed by facet name.
     *
     * @param {Facet[]} facets
     * @returns {Map<string, Facet>}
     */
    private static createFacetsMap(facets: Facet[]): Map<string, Facet> {

        return facets.reduce((acc: Map<string, Facet>, facet: Facet): Map<string, Facet> => {
            acc.set(facet.name, facet);
            return acc;
        }, new Map<string, Facet>());
    }

    /**
     * Convert array of file fileFacets into an array of file facet names
     *
     * @param {Facet[]} facets
     * @returns {string[]}
     */
    private static createFacetNames(facets: Facet[]): string[] {

        return facets.map((facet) => {
            return facet.name;
        });
    }

    /**
     * Check if user has selected a term from a facet different from the previously selected term and if so, we'll need
     * to update the selected facet.
     * 
     * @param {Facet} currentSelectedFacet
     * @param {Facet} newSelectedFacet
     */
    private determineSelectedFacet(currentSelectedFacet: Facet, newSelectedFacet: Facet) {

        // We're working on the same selected facet
        if ( this.selectedFacet && (newSelectedFacet.name === this.selectedFacet.name) ) {
            return this.selectedFacet;
        }
        
        // We're working on a new facet
        return newSelectedFacet;
    }
}
