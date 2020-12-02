/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of matrix file associated with a project, either contributor-generated or DCP-generated.
 */

export interface ProjectMatrixView {
    fileName: string;
    shortName: string;
    url: string;
    [key: string]: any // Allow additional meta eg library construction approach, species
}
