/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selected term from facet menu.
 */

export class Term {

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
}


