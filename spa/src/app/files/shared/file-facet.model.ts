import { Term } from "./term.model";

export class FileFacet {

    public readonly name: string;
    public readonly total: number;
    public readonly terms: Term[];
    public readonly selectedTerms: Term[];
    public readonly termsByName: Map<string,Term>;

    public readonly termCount :number;              //number of terms available
    public readonly selectedTermCount : number;     //number of selected terms
    public readonly selected: boolean;              //true if any terms are selected


    public readonly moar: boolean;                  //shold we show the moar button
    public readonly moarCount:number;               //how many moar are there?

    public readonly shortList: Term[]; //holds the first 3 terms or the first 3 selected terms

    constructor(name: string, total: number, terms: Term[]){

        this.name = name;
        this.total = total;
        this.terms = terms;

        this.selectedTerms = this.terms.filter((term) => {
            return term.selected;
        });

        //Are any terms selected?
        this.selected = this.terms.some((term) => {
            return term.selected;
        });

        this.termsByName = terms.reduce((map,term): Map<string,Term> => {
            return map.set(term.name,term);
        }, new Map<string,Term>());

        this.termCount = terms.length;
        this.selectedTermCount = this.selectedTerms.length;


        //Set the short list
        if(!this.selected){
            //if we are not selected use the full list.
            this.shortList = this.terms.slice(0,Math.min(3, this.terms.length));
        }else{
            //if we are selected use the selected list.
            this.shortList = this.selectedTerms.slice(0,Math.min(3, this.selectedTerms.length));
        }

        //Short list length is 1 to 3 depending on number of items selected.
        this.moarCount = this.terms.length - this.shortList.length;
        this.moar = this.moarCount >0;

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