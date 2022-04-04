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
    columnFlexDirection?: ColumnFlexDirection;
    columnMaxWidth?: number;
    columnMinWidth?: number;
    columnOverflow?: OverflowType;
    columnPosition?: PositionType;
    columnSort: boolean;
    columnSortKey?: string;
    columnTitleWidth?: number;
    countType: CountType;
    countName?: string;
    description?: string;
    descriptionFiles?: string;
    descriptionProjects?: string;
    descriptionSamples?: string;
    userFriendly: string;
}

export enum ColumnAlignment {
    "CENTER",
    "LEFT",
    "RIGHT",
}

export enum ColumnFlexDirection {
    "COLUMN",
}

export enum CountType {
    "DOMAIN_COUNT",
    "NONE",
    "SUMMARY_COUNT",
}

export enum OverflowType {
    "VISIBLE" = "visible",
}

export enum PositionType {
    "RELATIVE" = "relative",
}
