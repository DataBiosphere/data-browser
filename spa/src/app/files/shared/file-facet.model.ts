/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core file facet model, including name, total, terms and interface type.
 */

// App dependencies
import { Term } from "./term.model";

export class FileFacet {

    public readonly name: string;
    public readonly total: number;
    public readonly terms: Term[];
    public readonly selectedTerms: Term[];
    public readonly termsByName: Map<string, Term>;

    public readonly termCount: number;              // number of terms available
    public readonly selectedTermCount: number;     // number of selected terms
    public readonly selected: boolean;              // true if any terms are selected


    public readonly moar: boolean;                  // should we show the moar button
    public readonly moarCount: number;               // how many moar are there?

    public readonly shortList: Term[]; // holds the first 3 terms or the first 3 selected terms
    public readonly shortListLength: number = 10;

    public readonly interfaceType: string; // Type of widget to display for facet (eg search autocomplete, checkbox
                                           // list)

    /**
     * @param name {string}
     * @param total {number}
     * @param terms {Term[]}
     * @param shortListLength {number}
     * @param interfaceType {string}
     */
    constructor(name: string, total: number, terms: Term[], shortListLength: number, interfaceType?: string) { // TODO finalize interfaceType type and optionality

        this.name = name;
        this.total = total;
        this.terms = terms;
        this.interfaceType = interfaceType;

        if ( this.interfaceType === "SEARCH" ) {
            this.shortListLength = 3;
        }
        else {
            this.shortListLength = shortListLength;
        }

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
        if ( !this.selected || this.isTermListShort() ) {
            // If we are not selected or if there are less than the short term list length (as there is no term menu).
            // use the full list.
            this.shortList = this.terms.slice(0, Math.min(this.shortListLength, this.terms.length));
        }
        else {
            // If we are selected use the selected list.
            this.shortList = this.selectedTerms.slice(0, Math.min(this.shortListLength, this.selectedTerms.length));
        }

        this.moarCount = this.terms.length - this.shortList.length;
        this.moar = this.moarCount > 0;

    }

    /**
     * Returns true if file facet type is search (ie for file ID or donor ID).
     *
     * @returns {boolean}
     */
    public isInterfaceTypeSearch(): boolean {

        return this.interfaceType === "SEARCH"; // TODO revisit interfaceType type
    }

    /**
     * Returns true if there are less than 10 terms for this file facet.
     *
     * @returns {boolean}
     */
    public isTermListShort(): boolean {

        return this.termCount < this.shortListLength;
    }

    /**
     * Update flag indicating whether specified term is selected and return new FileFacet with updated term list.
     *
     * @param {string} termName
     * @returns {FileFacet}
     */
    public selectTerm(termName: string): FileFacet {

        if ( this.isInterfaceTypeSearch() ) {
            return this.selectSearchTerm(termName);
        }

        // Check each term to see if it's the newly selected term. If so, toggle the selected indicator on the term,
        // otherwise keep the term as is.
        const newTerms = this.terms.map(term => {

            if ( term.name === termName ) {
                // Flip term selected instead of setting it.
                return new Term(termName, term.count, !term.selected, term.color);
            }
            else {
                return term;
            }

        });

        // Create new file facet with updated term map
        return new FileFacet(this.name, this.total, newTerms, this.shortListLength);
    }

    /**
     * PRIVATES
     */

    /**
     * Update flag indicating whether specified term is selected.
     * @param {string} id - Either file ID or donor ID
     * @returns {FileFacet}
     */
    private selectSearchTerm(id: string): FileFacet {

        let newTerms: Term[];

        let contains = this.terms.some((t) => {
            return id === t.name;
        });

        if ( contains ) {
            // remove
            newTerms = this.terms.filter((t) => {
                return id !== t.name;
            });

        }
        else {
            // add
            newTerms = this.terms.slice();
            newTerms.push(new Term(id, 1, true, "000000"));
        }


        return new FileFacet(this.name, this.total, newTerms, this.shortListLength, "SEARCH");
    }

}
