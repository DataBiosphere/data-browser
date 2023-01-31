export enum ELEMENT_ALIGNMENT {
  CENTER = "CENTER",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

/**
 * Filterable metadata keys.
 */
export type CategoryKey = string;

/**
 * View model of category tag.
 */
export interface CategoryTag {
  label: string;
  onRemove: () => void;
  superseded: boolean;
}

/**
 * Category values to be used as keys. For example, "Homo sapiens" or "10X 3' v2 sequencing".
 */
export type CategoryValueKey = string;

/**
 * Internal filter model of a multiselect category (e.g. library construction approach).
 */
export interface SelectCategory {
  key: CategoryKey;
  label: string;
  values: SelectCategoryValue[];
}

/**
 * Internal filter model of a multiselect category value (e.g. "10x 3' v1").
 */
export interface SelectCategoryValue {
  count: number;
  key: CategoryKey;
  label: string; // Allows for displaying null values as "Unspecified"
  selected: boolean;
}

/**
 * View model of category value, selected state and count for single or multiselect categories.
 */
export interface SelectCategoryValueView {
  count: number;
  key: CategoryValueKey;
  label: string;
  selected: boolean;
}

/**
 * View model of category, for multiselect categories.
 */
export interface SelectCategoryView {
  isDisabled?: boolean;
  key: CategoryValueKey;
  label: string;
  values: SelectCategoryValueView[];
}

/**
 * Generic pagination model used by both static and dynamic lists.
 */
export interface Pagination {
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

/**
 * Possible pagination direction values.
 */
export type PaginationDirectionType = "next" | "prev";
