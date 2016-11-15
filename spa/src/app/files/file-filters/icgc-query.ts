export interface ICGCQuery {
    filters: string;
    include: string;
    size: number;
    from?: number;
    format?: string;
}
