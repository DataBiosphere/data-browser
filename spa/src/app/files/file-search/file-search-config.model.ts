/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Meta required for setting file or donor search facets.
 */

export class FileSearchConfig {

    // Public variables
    public fileFacetName: string;
    public searchType: string;
    public placeholder: string;

    /**
     * @param fileFacetName {string}
     */
    constructor(fileFacetName: string) {

        this.fileFacetName = fileFacetName;

        if ( this.isFileSearch() ) {
            this.searchType = "file";
            this.placeholder = "e.g. FI123";
        }
        else {
            this.searchType = "donor"; // file-donor
            this.placeholder = "e.g. DO45299";
        }
    }

    /**
     * Public API
     */

    /**
     * Returns true if file facet is file (and not donor).
     *
     * @returns {boolean}
     */
    public isFileSearch() {

        return this.fileFacetName === "fileId";
    }
}
