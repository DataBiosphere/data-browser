export class ICGCQuery {
    public readonly filters: string;
    public readonly format?: string;

    constructor(filters: string, format?: string) {

        this.filters = filters;
        if ( format ) {
            this.format = format;
        }

    }

}
