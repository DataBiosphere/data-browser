/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file facet list and related selected facet terms states, pagination etc. Also contains convenience maps for
 * querying state.
 */
// App dependencies
import { FileFacet } from "../../shared/file-facet.model";
import { FetchFileFacetsSuccessAction, SelectFileFacetAction } from "./file-facet-list.actions";
import { PaginationModel } from "../../table/pagination.model";

export class FileFacetListState {

    public readonly fileFacets: FileFacet[];
    public readonly selectedFileFacetsByName: Map<string, FileFacet>;
    public readonly selectedFileFacets: FileFacet[];
    public readonly selectedFacet: FileFacet; // the one being edited.
    public readonly paginationModel: PaginationModel;

    private readonly fileFacetNames: string[];
    private readonly fileFacetsByName: Map<string, FileFacet>;

    /**
     * @param {string[]} fileFacetNames
     * @param {Map<string, FileFacet>} nameToFileFacetMap
     * @param {FileFacet} selectedFacet
     * @param {PaginationModel} paginationModel
     */
    constructor(fileFacetNames: string[],
                nameToFileFacetMap: Map<string, FileFacet>,
                selectedFacet: FileFacet,
                paginationModel: PaginationModel) {

        this.fileFacetNames = fileFacetNames;
        this.fileFacetsByName = nameToFileFacetMap;
        this.selectedFacet = selectedFacet;

        // TODO set default pagination model if undefined
        this.paginationModel = paginationModel;

        this.selectedFileFacetsByName =
            this.fileFacetNames.map(name => this.fileFacetsByName.get(name)).reduce((map, val) => {
                return map.set(val.name, val);
            }, new Map<string, FileFacet>());

        this.fileFacets = this.fileFacetNames.map((facetName) => {
            return this.fileFacetsByName.get(facetName);
        });

        this.selectedFileFacets = this.fileFacets.filter(facet => facet.selected);
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

    /*******************************************
     * Privates HA HA
     *******************************************/

    /**
     * Clear Selected Facet
     *
     * @returns {FileFacetListState}
     */
    public clearSelectedFacet() {
        return new FileFacetListState(this.fileFacetNames, this.fileFacetsByName, undefined, undefined);
    }

    /**
     * Handle select/deselect of facet term - create new file facet list state based on selected facet (term) action.
     *
     * @param {SelectFileFacetAction} action
     * @returns {FileFacetListState}
     */
    public selectTerm(action: SelectFileFacetAction): FileFacetListState {

        const facetName = action.event.facetName;
        const termName = action.event.termName;

        const facet = this.fileFacetsByName.get(facetName);

        if (!facet) {
            // error case just return the current state.
            return this;
        }

        // Update selected indicator on selected term - find the facet with the term that was selected and update term's
        // selected flag.
        const m = new Map<string, FileFacet>();
        this.fileFacetsByName.forEach((f) => {

            if (f.name === facetName) {
                m.set(f.name, f.selectTerm(termName));

            }
            else {
                m.set(f.name, f);
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
        return new FileFacetListState(this.fileFacetNames, m, selectedFacet, this.paginationModel);
    }
}
