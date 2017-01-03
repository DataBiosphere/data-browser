export class ICGCQuery {
    public readonly filters: string;
    public readonly format?: string;

    constructor(filters: string){

        this.filters = filters;

    }

}
