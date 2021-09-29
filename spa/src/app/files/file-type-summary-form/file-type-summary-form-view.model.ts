/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of file type summary, and the selected status of the corresponding facet term. Used when selecting files type
 * for manifest generation or export to Terra. Displayed in format:
 * 
 *     Name                File Count     File Size
 * [ ] bai                 289            547 MB
 * [ ] bam                 758            2.40 TB
 * [ ] csv                 2.2K           2.96 GB
 * etc
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export class FileTypeSummaryFormView implements TermSortable {

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
     * The sort value of a file type summary view is its term name.
     *
     * @returns {string}
     */
    public getSortValue(): string {

        return this.termName;
    }
}
