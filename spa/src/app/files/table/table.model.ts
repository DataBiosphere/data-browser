/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of table that displays file facet data.
 */

// App dependencies
import { PaginationModel } from "./pagination.model";

export class TableModel {

    public pagination: PaginationModel;
    public data: any[];

    /**
     * @param {any[]} data
     * @param {PaginationModel} pagination
     */
    constructor(data: any[], pagination: PaginationModel) {

        this.data = data;
        this.pagination = pagination;
    }
}
