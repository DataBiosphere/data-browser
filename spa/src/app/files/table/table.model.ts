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
    public tableName: string;

    /**
     * @param {any[]} data
     * @param {PaginationModel} pagination
     * @param {string} tableName
     */
    constructor(data: any[], pagination: PaginationModel, tableName: string) {

        this.data = data;
        this.pagination = pagination;
        this.tableName = tableName;
    }
}
