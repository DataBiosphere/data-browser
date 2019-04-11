/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file facet list and related selected facet terms states, pagination etc. Also contains convenience maps for
 * querying state.
 */

// App dependencies
import {
    FetchFileFacetsSuccessAction
} from "./file-facet-list.actions";
import { SelectProjectAction } from "../search/select-project.action";
import { SelectSearchTermAction } from "../search/select-search-term.action";
import { SetViewStateAction } from "./set-view-state.action";
import { FileFacet } from "../../shared/file-facet.model";
import { QueryStringFacet } from "../../shared/query-string-facet.model";
import { Term } from "../../shared/term.model";
import { PaginationModel } from "../../table/pagination.model";

export class FileFacetListState {

    public readonly fileFacets: FileFacet[];
    public readonly selectedFacet: FileFacet; // the one being edited.
    public readonly paginationModel: PaginationModel;

    private readonly fileFacetNames: string[];
    private readonly fileFacetsByName: Map<string, FileFacet>;

    /**
     * @param {string[]} fileFacetNames
     * @param {Map<string, FileFacet>} fileFacetsByName
     * @param {FileFacet} selectedFacet
     * @param {PaginationModel} paginationModel
     */
    constructor(fileFacetNames: string[],
                fileFacetsByName: Map<string, FileFacet>,
                selectedFacet: FileFacet,
                paginationModel: PaginationModel) {

        this.fileFacetNames = fileFacetNames;
        this.fileFacetsByName = fileFacetsByName;
        this.selectedFacet = selectedFacet;

        // TODO set default pagination model if undefined
        this.paginationModel = paginationModel;

        this.fileFacets = this.fileFacetNames.map((facetName) => {
            return this.fileFacetsByName.get(facetName);
        });
    }

    /**
     * Create default state of file facet list - empty list of file facets, no selected facets, no pagination state.
     *
     * @returns {FileFacetListState}
     */
    public static getDefaultState() {
        return new FileFacetListState([], new Map<string, FileFacet>(), undefined, undefined);
    }

    /**
     * Convert array of facets into a map of facets keyed by facet name.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Map<string, FileFacet>}
     */
    private static createFileFacetsMap(fileFacets: FileFacet[]): Map<string, FileFacet> {

        const startValue: Map<string, FileFacet> = new Map<string, FileFacet>();

        return fileFacets.reduce((acc: Map<string, FileFacet>, value: FileFacet): Map<string, FileFacet> => {
            acc.set(value.name, value);
            return acc;
        }, startValue);
    }

    /**
     * Convert array of file facets into an array of file facet names
     *
     * @param {FileFacet[]} fileFacets
     * @returns {string[]}
     */
    private static createFileFacetNames(fileFacets: FileFacet[]): string[] {

        return fileFacets.map((fileFacet) => {
            return fileFacet.name;
        });
    }

    /**
     * Return model of the current state of the file facet list (including pagination)
     *
     * @returns {FileFacetListState}
     */
    public requestFileFacets(): FileFacetListState {

        return new FileFacetListState(this.fileFacetNames, this.fileFacetsByName, this.selectedFacet, this.paginationModel);
    }

    /**
     * Handle updated list of file facets that have been returned from the server end point.
     *
     * @param {FetchFileFacetsSuccessAction} action
     * @returns {FileFacetListState}
     */
    public receiveFileFacets(action: FetchFileFacetsSuccessAction): FileFacetListState {

        return new FileFacetListState(FileFacetListState.createFileFacetNames(action.fileFacets),
            FileFacetListState.createFileFacetsMap(action.fileFacets), this.selectedFacet, this.paginationModel);
    }

    /**
     * Clear Selected Facet
     *
     * @returns {FileFacetListState}
     */
    public clearSelectedFacet() {

        return new FileFacetListState(
            this.fileFacetNames, this.fileFacetsByName, undefined, undefined);
    }

    /**
     * Handle select/deselect of facet term - create new file facet list state based on selected facet (term) action.
     *
     * @param {SelectSearchTermAction | SelectProjectAction} action
     * @returns {FileFacetListState}
     */
    public selectTerm(action: SelectSearchTermAction | SelectProjectAction): FileFacetListState {

        const facetName = action.facetName;
        const termName = action.getTermKey();

        const facet = this.fileFacetsByName.get(facetName);

        if (!facet) {
            // error case just return the current state.
            return this;
        }

        // Update selected indicator on selected term - find the facet with the term that was selected and update term's
        // selected flag.
        const fileFacetsByName = new Map<string, FileFacet>();
        this.fileFacetsByName.forEach((f) => {

            if (f.name === facetName) {
                fileFacetsByName.set(f.name, f.selectTerm(termName));

            }
            else {
                fileFacetsByName.set(f.name, f);
            }

        });

        // Update selected file facet - check if user has selected a term from a facet different from the previously
        // selected term and if so, update the selected facet.
        let selectedFacet: FileFacet;
        if (this.selectedFacet && (facet.name === this.selectedFacet.name )) {
            // working on the same selected facet
            selectedFacet = this.selectedFacet;
        }
        else {
            // selected a new facet
            selectedFacet = facet;
        }

        // Return new state of file facet list (ie with newly selected/deselected term and potentially newly selected
        // facet).
        return new FileFacetListState(this.fileFacetNames, fileFacetsByName, selectedFacet, this.paginationModel);
    }

    /**
     * Handle select of facet terms on init of app. App state is pulled from URL params and we must convert this to
     * a set of selected facet terms, if any.
     *
     * @param {SetViewStateAction} action
     * @returns {FileFacetListState}
     */
    public setSelectedFacetTermsFromViewState(action: SetViewStateAction): FileFacetListState {

        // Update new state with selected terms
        const selectedFacetStates = action.selectedFacets;

        // Create file facet names
        const fileFacetNames = selectedFacetStates.map((selectedFacetState: QueryStringFacet) => {
            return selectedFacetState.facetName;
        });

        // Create file facet and term objects, and add to map
        const fileFacetsMap = selectedFacetStates.reduce((accum, selectedFacetState: QueryStringFacet) => {

            // Create the terms for this file facet - default term count to 0 and color to black. Term has been specified
            // in the URL as selected so set the selected flag accordingly.
            const terms = selectedFacetState.selectedTermNames.map((termName: string) => {
                return new Term(termName, 0, true, "#000000");
            });

            // Create the file facet, set total and short list length to 0; these values will be updated on the initial
            // request of file facet data from the server.
            const facetName = selectedFacetState.facetName;
            const fileFacet = new FileFacet(facetName, 0, terms, 0);

            accum.set(facetName, fileFacet);
            return accum;
        }, new Map<string, FileFacet>());

        return new FileFacetListState(fileFacetNames, fileFacetsMap, null, null);
    }
}
