import { PaginationModel } from "./pagination.model";

export class TableModel {

    public paginationModel: PaginationModel;
    public data: any[];

    constructor(data: any[], paginationModel: PaginationModel)  {

        this.data = data;
        this.paginationModel = paginationModel;

    }
}