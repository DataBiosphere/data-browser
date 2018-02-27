/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file facet list and related selected facet terms states, pagination etc. Also contains convenience maps for
 * querying state.
 */

// Core dependencies
import * as _ from "lodash";

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
    
    private readonly maxTermCount: number; // Maximum number of terms to display inside facet card

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
        
        this.maxTermCount = this.calculateMaxTermCount(this.fileFacets);
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

    /**
     * Create default state of file facet list - empty list of file facets, no selected facets, no pagination state.
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
     * Calculate the maximum number of terms to display inside a facet card. Determine the mode of terms across all
     * facets. If mode is less than 5, maximum number of terms if 5. Is mode is more than 10, maximum number of terms
     * is 10. Otherwise, use the mode as the maximum number of terms.
     * 
     * @param fileFacets {FileFacet[]}
     * @returns {number}
     */
    private calculateMaxTermCount(fileFacets: FileFacet[]): number {
        
        let maxTermCount = 0;
        
        console.log(_.chain(fileFacets)
            .groupBy("termCount")
            .filter((fileFacets: FileFacet[]) => {
                if ( fileFacets.length > maxTermCount ) {
                    maxTermCount = fileFacets.length;
                    return true;
                }
                return false;
            })
            .value());
        
        // fileFacets
        //     .reduce((counts: {number: number}, fileFacet: FileFacet) => {
        //         let termCount = fileFacet.termCount;
        //         counts[termCount] = (counts[termCount] || 0) + 1;
        //         return counts; 
        //     }, {})
        //     .sort((counts: {number: number}) => {
        //        
        //     });
        
        
        
        return 0;
    }
}
