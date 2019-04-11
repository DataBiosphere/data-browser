/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file type summary, and the selected status of the corresponding file facet.
 */

export interface FacetFileTypeSummary {

    count: number;
    selected: boolean;
    size: number;
    termName: string;
}
