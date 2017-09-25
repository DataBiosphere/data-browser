/**
 * Event emitted when term is selected.
 */
export class FileFacetSelectedEvent {


    /**
     * Constructor
     *
     * @param {string} facetName
     * @param {string} termName
     * @param {boolean} selected
     */
    constructor(
        public readonly facetName: string,
        public readonly termName: string,
        public readonly selected = true) {

    }
}
