/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a facet that contains a list of terms values.
 * 
 * TODO
 * Refactor this model to be called FacetTerms or FacetTermList to indicate that it is a facet that contains a list of terms.
 */

// App dependencies
import { Facet } from "../facet.model";
import { Term } from "../../shared/term.model";

export class FileFacet implements Facet {

    public readonly name: string;
    public readonly total: number;
    public readonly terms: Term[];
    public readonly selectedTerms: Term[];
    public readonly termsByName: Map<string, Term>;

    public readonly termCount: number;              // number of terms available
    public readonly selectedTermCount: number;     // number of selected terms
    public readonly selected: boolean;              // true if any terms are selected

    /**
     * @param name {string}
     * @param total {number}
     * @param terms {Term[]}
     */
    constructor(name: string, total: number, terms: Term[]) {

        this.name = name;
        this.total = total;
        this.terms = terms;

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
    }

    /**
     * Returns for a specified facet, all terms if none are selected, or the selected terms only.
     *
     * @returns {Term[]}
     */
    public getEffectiveTerms(): Term[] {

        // Return an empty array if there are no terms
        if ( !this.terms || !this.terms.length ) {
            return [];
        }

        // Otherwise return either the list of selected terms only, or if none are selected, the full list of terms
        return this.selected ? this.selectedTerms : this.terms;
    }

    /**
     * Returns true if the specified term(s) is the only term in the list of terms for this facet, or is the only
     * selected term.
     *
     * @param {string[]} termNames
     * @returns {boolean}
     */
    public isOnlySelectedTerm(...termNames: string[]): boolean {

        // False if there are no terms
        if ( !this.terms || !this.terms.length ) {
            return false;
        }

        // Otherwise ensure the list of selected terms only contain the specified terms
        const selected = this.getEffectiveTerms();
        const termsToSearch = selected.length ?
            selected :
            this.terms;

        return !termsToSearch.some((term: Term) => {
            return termNames.indexOf(term.name) === -1;
        });
    }

    /**
     * Update flag indicating whether specified term is selected and return new FileFacet with updated term list.
     *
     * @param {string} termName
     * @returns {FileFacet}
     */
    public selectTerm(termName: string): FileFacet {

        // Check each term to see if it's the newly selected term. If so, toggle the selected indicator on the term,
        // otherwise keep the term as is.
        const newTerms = this.terms.map(term => {

            if ( term.name === termName ) {
                // Flip term selected instead of setting it.
                return new Term(termName, term.count, !term.selected);
            }
            else {
                return term;
            }

        });

        // Create new file facet with updated term map
        return new FileFacet(this.name, this.total, newTerms);
    }
}
