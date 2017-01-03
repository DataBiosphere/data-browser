
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";
export class FileFacetSelectedEvent{

    public readonly facet: string;
    public readonly term: string;
    public readonly selected: boolean;

    constructor(fileFacet: FileFacet, term: Term){
        this.facet = fileFacet.name;
        this.term = term.name;
        this.selected = term.selected;
    }

}