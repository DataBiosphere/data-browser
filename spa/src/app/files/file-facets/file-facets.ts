
export interface FileFacet {
    name: string;
    total: number;
    terms: Term[];
}
export interface Term {
    name: string;
    count: number;
    selected: boolean;
}
