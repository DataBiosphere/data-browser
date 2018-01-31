/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * Model of counts, file sizes and other summary values of the current selection of facets.
 */

export interface FileSummary {
    fileCount: number;
    totalFileSize: number;
    donorCount: number;
    projectCount: number;
    primarySiteCount: number;
    primarySite: string|number;
}
