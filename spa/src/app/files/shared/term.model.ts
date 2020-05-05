/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an individual facet value. For example, the term "Homo Sapiens" contained in the facet "Species".
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export class Term implements TermSortable {

    public readonly name: string;
    public readonly count: number;
    public readonly selected: boolean;

    /**
     * @param {string} name
     * @param {number} count
     * @param {boolean} selected
     */
    constructor(name: string, count: number, selected: boolean) {
        this.name = name;
        this.count = count;
        this.selected = selected;
    }

    /**
     * Update selected value of term.
     *
     * @param {boolean} selected
     * @returns {Term}
     */
    public setSelected(selected: boolean): Term {
        return new Term(this.name, this.count, selected);
    }

    /**
     * The sort value of a term is its term name;
     *
     * @returns {string}
     */
    public getSortValue(): string {

        return this.name;
    }
}


