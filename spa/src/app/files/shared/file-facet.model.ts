import { Term } from "./term.model";

export class FileFacet {

    public readonly name: string;
    public readonly total: number;
    public readonly terms: Term[];
    public readonly selectedTerms: Term[];
    public readonly termsByName: Map<string,Term>;
    public readonly selected: boolean

    constructor(name: string, total: number, terms: Term[]){

        this.name = name;
        this.total = total;
        this.terms = terms;

        this.selectedTerms = this.terms.filter((term) => {
            return term.selected;
        });

        this.selected = this.terms.some((term) => {
            return term.selected;
        });

        this.termsByName = terms.reduce((map,term): Map<string,Term> => {
            return map.set(term.name,term);
        }, new Map<string,Term>());

    }

    public selectTerm(termName:string): FileFacet{

        const newTerms = this.terms.map(term =>{

            if(term.name === termName){
                //FLIP TERM SELECTED INSTEAD OF SETTING IT
                return new Term(termName,term.count, !term.selected);
            }else{
                return term;
            }

        });

       return new FileFacet(this.name, this.total, newTerms);
    }
}