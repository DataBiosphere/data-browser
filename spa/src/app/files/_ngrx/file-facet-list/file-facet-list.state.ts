import { FileFacet } from "../../shared/file-facet.model";
import { FetchFileFacetsSuccessAction, SelectFileFacetAction } from "./file-facet-list.actions";
import { PaginationModel } from "../../table/pagination.model";
import { noUndefined } from "@angular/compiler/src/util";

export class FileFacetListState {

    public readonly fileFacets: FileFacet[];
    public readonly selectedFileFacesByName: Map<string, FileFacet>;
    public readonly selectedFileFacets: FileFacet[];
    // public readonly loading: boolean;
    public readonly selectedFacet: FileFacet; // the one being edited.
    public readonly paginationModel: PaginationModel;

    private readonly fileFacetNames: string[];
    private readonly fileFacetsByName: Map<string, FileFacet>;

    constructor(fileFacetNames: string[],
                nameToFileFacetMap: Map<string, FileFacet>,
                // loading: boolean,
                selectedFacet: FileFacet,
                paginationModel: PaginationModel) {

        // this.loading = loading;
        this.fileFacetNames = fileFacetNames;
        this.fileFacetsByName = nameToFileFacetMap;
        this.selectedFacet = selectedFacet;

        // TODO set default paginatin model if undefined
        this.paginationModel = paginationModel;

        this.selectedFileFacesByName =
            this.fileFacetNames.map(name => this.fileFacetsByName.get(name)).reduce((map, val) => {
                return map.set(val.name, val);
            }, new Map<string, FileFacet>());

        this.fileFacets = this.fileFacetNames.map((facetName) => {
            return this.fileFacetsByName.get(facetName);
        });

        this.selectedFileFacets = this.fileFacets.filter(facet => facet.selected);
    }

    /**
     * Request File Facets
     *
     * @returns {FileFacetListState}
     */
    public requestFileFacets(): FileFacetListState {
        return new FileFacetListState(this.fileFacetNames, this.fileFacetsByName, this.selectedFacet, this.paginationModel);
        // return this;
    }

    /**
     * Receive File Facets
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
        return new FileFacetListState(this.fileFacetNames, this.fileFacetsByName, undefined, undefined);
    }

    /**
     * Select Term
     * @param {SelectFileFacetAction} action
     * @returns {FileFacetListState}
     */
    public selectTerm(action: SelectFileFacetAction) {
        const facetName = action.event.facetName;
        const termName = action.event.termName;

        const facet = this.fileFacetsByName.get(facetName);

        if (!facet) {
            // error case just return the current state.
            return this;
        }
        else {

            const m = new Map<string, FileFacet>();
            this.fileFacetsByName.forEach((f) => {

                if (f.name === facetName) {
                    m.set(f.name, f.selectTerm(termName));

                }
                else {
                    m.set(f.name, f);
                }

            });

            let selectedFacet: FileFacet;
            if (this.selectedFacet && (facet.name === this.selectedFacet.name )) {
                // working on the same selected facet
                selectedFacet = this.selectedFacet;
            }
            else {
                // selected a new facet
                selectedFacet = facet;
            }

            return new FileFacetListState(this.fileFacetNames, m, selectedFacet, this.paginationModel);
        }
    }

    /**
     * Create Default State
     *
     * @returns {FileFacetListState}
     */
    public static getDefaultState() {
        return new FileFacetListState([], new Map<string, FileFacet>(), undefined, undefined);
    }

    /*******************************************
     * Privates HA HA
     *******************************************/

    /**
     *
     * @param fileFacets
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
     *
     * @param fileFacets
     * @returns {string[]}
     */
    private static createFileFacetNames(fileFacets: FileFacet[]): string[] {

        return fileFacets.map((fileFacet) => {
            return fileFacet.name;
        });
    }
}
