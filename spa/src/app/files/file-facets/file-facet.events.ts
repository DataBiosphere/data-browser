// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

/**
 * Event emitted when term is selected.
 */
export class FileFacetSelectedEvent {

    // Public variables
    public readonly facet: string;
    public readonly term: string;
    public readonly selected: boolean;

    /**
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    constructor(fileFacet: FileFacet, term: Term) {

        this.facet = fileFacet.name;
        this.term = term.name;
        this.selected = term.selected;
    }
}