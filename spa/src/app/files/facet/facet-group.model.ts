/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of facet names grouped by a "group name", for display in facet menus. For example, the facet names "organ",
 * "organPart" and "selectedCellType" are grouped under "organ".
 */

export interface FacetGroup {
    facetGroupName: string;
    facetNames: string[];
}
