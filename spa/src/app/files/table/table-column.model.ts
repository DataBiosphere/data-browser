/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of table column.
 */

export interface TableColumn {
    key: string;
    alignment: ColumnAlignment;
    columnMaxWidth?: number;
    countType: CountType;
    description?: string;
    userFriendly: string;
}

export enum ColumnAlignment {
    "LEFT",
    "RIGHT"
}

export enum CountType {
    "DOMAIN_COUNT",
    "NONE",
    "SUMMARY_COUNT"
}

