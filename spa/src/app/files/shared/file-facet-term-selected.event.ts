/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted when term is selected.
 */
export class FileFacetTermSelectedEvent {

    /**
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
