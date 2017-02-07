import { FileFacet } from "../shared/file-facet.model";

export class FileFacetsState {

    public readonly fileFacets: FileFacet[];
    public readonly selectedFileFacesByName: Map<string, FileFacet>;
    public readonly selectedFileFacets: FileFacet[];
    public readonly loading: boolean;
    public readonly selectedFacet: FileFacet; // the one being edited.

    private readonly fileFacetNames: string[];
    private readonly fileFacetsByName: Map<string, FileFacet>;

    constructor(fileFacetNames: string[],
                nameToFileFacetMap: Map<string, FileFacet>,
                loading: boolean,
                selectedFacet: FileFacet) {

        this.loading = loading;
        this.fileFacetNames = fileFacetNames;
        this.fileFacetsByName = nameToFileFacetMap;
        this.selectedFacet = selectedFacet;

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
     *
     * @param fileFacets
     * @returns {FileFacetsState}
     */
    public setFileFacets(fileFacets: FileFacet[]): FileFacetsState {

        return new FileFacetsState(FileFacetsState.createFileFacetNames(fileFacets),
            FileFacetsState.createFileFacetsMap(fileFacets), false, this.selectedFacet);
    }

    /**
     *
     * @param loading
     * @returns {FileFacetsState}
     */
    public setLoading(loading: boolean): FileFacetsState {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, loading, this.selectedFacet);
    }

    public clearSelectedFacet() {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, this.loading, undefined);
    }

    /**
     *
     *
     * @param facetName
     * @param termName
     * @returns {FileFacetsState}
     */
    public selectTerm(facetName: string, termName: string) {

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

            return new FileFacetsState(this.fileFacetNames, m, true, selectedFacet);
        }
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
