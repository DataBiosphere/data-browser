/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of table column.
 */

export interface TableColumn {
    key: string;
    alignment: ColumnAlignment;
    columnFlexValue?: string;
    columnMaxWidth?: number;
    columnMinWidth?: number;
    countType: CountType;
    description?: string;
    userFriendly: string;
}

export enum ColumnAlignment {
    "CENTER",
    "LEFT",
    "RIGHT"
}

export enum CountType {
    "DOMAIN_COUNT",
    "NONE",
    "SUMMARY_COUNT"
}

