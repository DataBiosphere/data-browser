/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of facet/entity names grouped by a "group name", for display in file facet menus. For example, the facet names
 * "organ", "organPart" and "selectedCellType" are grouped under "organ".
 */

export interface FileFacetGroup {
    facetGroupName: string;
    facetNames: string[];
}
