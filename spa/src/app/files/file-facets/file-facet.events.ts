// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

/**
 * Event emitted when term is selected.
 */
export class FileFacetSelectedEvent {


    /**
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    constructor(
        public readonly facetName: string,
        public readonly termName: string,
        public readonly selected = true) {

    }
}
