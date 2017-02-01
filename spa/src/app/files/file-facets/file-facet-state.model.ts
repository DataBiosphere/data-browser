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
<<<<<<< 38e7e695527e59589aab9c5b7786eadeff61195f

    public selectFacet(selectedFacet: FileFacet): FileFacetsState {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, this.loading, selectedFacet);
    }

    public clearSelectedFacet() {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, this.loading, undefined);
    }

=======

    public selectFacet(selectedFacet: FileFacet): FileFacetsState {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, this.loading, selectedFacet);
    }

    public clearSelectedFacet() {
        return new FileFacetsState(this.fileFacetNames, this.fileFacetsByName, this.loading, undefined);
    }

>>>>>>> linting
    /**
     *
     *
     * @param facetName
     * @param termName
     * @returns {FileFacetsState}
     */
    public selectTerm(facetName: string, termName: string) {

<<<<<<< 38e7e695527e59589aab9c5b7786eadeff61195f
        const termFacet = this.fileFacetsByName.get(facetName);

        if (!termFacet) {
=======
        const facet = this.fileFacetsByName.get(facetName);

        if (!facet) {
>>>>>>> linting
            return this;
        }
        else {

<<<<<<< 38e7e695527e59589aab9c5b7786eadeff61195f
            const m = new Map<string, FileFacet>();
=======
            const m = new Map<string, FileFacet>()
>>>>>>> linting
            this.fileFacetsByName.forEach((facet) => {

                if (facet.name === facetName) {
                    m.set(facet.name, facet.selectTerm(termName));

                }
                else {
                    m.set(facet.name, facet);
                }

            });

            let selectedFacet: FileFacet;
<<<<<<< 38e7e695527e59589aab9c5b7786eadeff61195f
            if (this.selectedFacet && (termFacet.name === this.selectedFacet.name )) {
                selectedFacet = this.selectedFacet;
            }
            else {
                selectedFacet = termFacet;
            }

            return new FileFacetsState(this.fileFacetNames, m, true, selectedFacet);
=======
            if (this.selectedFacet && (facet.name === this.selectedFacet.name )) {
                selectedFacet = this.selectedFacet;
            }
            else {
                selectedFacet = facet;
            }

            return new FileFacetsState(this.fileFacetNames, m, true, selectedFacet);

>>>>>>> linting
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
<<<<<<< 38e7e695527e59589aab9c5b7786eadeff61195f

        const startValue: Map<string, FileFacet> = new Map<string, FileFacet>();

        return fileFacets.reduce((acc: Map<string, FileFacet>, value: FileFacet): Map<string, FileFacet> => {
            acc.set(value.name, value);
            return acc;
        }, startValue);
=======

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
>>>>>>> linting
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
