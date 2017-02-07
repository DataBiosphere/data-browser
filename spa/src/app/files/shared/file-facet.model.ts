// App dependencies
import { Term } from "./term.model";
import { selectSearchTerm } from "../../keywords/reducer/keywords.reducer";

/**
 * Core file facet model, including name, total, terms and interface type.
 */
export class FileFacet {

    public readonly name: string;
    public readonly total: number;
    public readonly terms: Term[];
    public readonly selectedTerms: Term[];
    public readonly termsByName: Map<string, Term>;

    public readonly termCount: number;              // number of terms available
    public readonly selectedTermCount: number;     // number of selected terms
    public readonly selected: boolean;              // true if any terms are selected


    public readonly moar: boolean;                  // shold we show the moar button
    public readonly moarCount: number;               // how many moar are there?

    public readonly shortList: Term[]; // holds the first 3 terms or the first 3 selected terms
    public readonly shortListLength: number = 4;

    public readonly interfaceType: string; // Type of widget to display for facet (eg search autocomplete, checkbox
                                           // list)

    /**
     * @param name {string}
     * @param total {number}
     * @param terms {Term[]}
     * @param interface {string}
     */
    constructor(name: string, total: number, terms: Term[], interfaceType?: string) { // TODO finalize interfaceType type and optionality

        this.name = name;
        this.total = total;
        this.terms = terms;
        this.interfaceType = interfaceType;

        this.selectedTerms = this.terms.filter((term) => {
            return term.selected;
        });

        // Are any terms selected?
        this.selected = this.terms.some((term) => {
            return term.selected;
        });

        this.termsByName = terms.reduce((map, term): Map<string, Term> => {
            return map.set(term.name, term);
        }, new Map<string, Term>());

        this.termCount = terms.length;
        this.selectedTermCount = this.selectedTerms.length;


        // Set the short list
        if (!this.selected) {
            // if we are not selected use the full list.
            this.shortList = this.terms.slice(0, Math.min(this.shortListLength, this.terms.length));
        }
        else {
            // if we are selected use the selected list.
            this.shortList = this.selectedTerms.slice(0, Math.min(this.shortListLength, this.selectedTerms.length));
        }

        // Short list length is 1 to 3 depending on number of items selected.
        this.moarCount = this.terms.length - this.shortList.length;
        this.moar = this.moarCount > 0;

    }

    public isInterfaceTypeSearch(): boolean {

        return this.interfaceType === "SEARCH"; // TODO revisit interfaceType type
    }

    public selectTerm(termName: string): FileFacet {

        if (this.isInterfaceTypeSearch()) {
            return this.selectSearchTerm(termName);
        }

        const newTerms = this.terms.map(term => {

            if (term.name === termName) {
                // Flip term selected instead of setting it.
                return new Term(termName, term.count, !term.selected, term.color);
            }
            else {
                return term;
            }

        });

        return new FileFacet(this.name, this.total, newTerms);
    }

    private selectSearchTerm(termName: string): FileFacet {

        let newTerms: Term[];

        let contains = this.terms.some((t) => {
            return termName === t.name;
        });

        if (contains) {
            // remove
            newTerms = this.terms.filter((t) => {
                return termName !== t.name;
            });

        }
        else {
            // add
            newTerms = this.terms.slice();
            newTerms.push(new Term(termName, newTerms.length + 1, true, "CCCCCC"));
        }


        // remove it if we already have it.

        // add it if we dont have it

        return new FileFacet(this.name, this.total, newTerms, "SEARCH");
    }

}
