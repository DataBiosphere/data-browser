/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file type summary, and the selected status of the corresponding facet term.
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export class FileTypeSummaryView implements TermSortable {

    /**
     * @param {string} termName
     * @param {number} size
     * @param {number} count
     * @param {boolean} selected - True if corresponding file format facet term is selected
     */
    constructor(public readonly termName: string,
                public readonly size: number,
                public readonly count: number,
                public readonly selected: boolean) {}

    /**
     * The sort value of a file type summary view is its term name;
     *
     * @returns {string}
     */
    public getSortValue(): string {

        return this.termName;
    }
}
