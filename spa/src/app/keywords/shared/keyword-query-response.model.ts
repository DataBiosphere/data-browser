export interface KeywordQueryResponse {
    hits: any[];
    pagination: {
        count: number;
        from: number;
        order: "desc" | "asc";
        page: number;
        pages: number;
        size: number;
        sort: string;
        total: number;
    };
}
