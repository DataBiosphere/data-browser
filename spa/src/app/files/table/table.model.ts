import { PaginationModel } from "./pagination.model";

export class TableModel {

    public pagination: PaginationModel;
    public data: any[];

    constructor(data: any[], pagination: PaginationModel)  {

        this.data = data;
        this.pagination = pagination;

    }
}