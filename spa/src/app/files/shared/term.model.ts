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
    public color: string;

    /**
     * @param {string} name
     * @param {number} count
     * @param {boolean} selected
     * @param {string} color
     */
    constructor(name: string, count: number, selected: boolean, color: string) {
        this.name = name;
        this.count = count;
        this.selected = selected;
        this.color = color;
    }

    /**
     * Update selected value of term.
     *
     * @param {boolean} selected
     * @returns {Term}
     */
    public setSelected(selected: boolean): Term {
        return new Term(this.name, this.count, selected, this.color);
    }
}


