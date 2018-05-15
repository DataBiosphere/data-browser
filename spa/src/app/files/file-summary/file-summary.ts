/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * Model of counts, file sizes and other summary values of the current selection of facets.
 */

export interface FileSummary {
    biomaterialCount: number; /* HCA Specific */
    bodyPartsCounts: number;
    donorCount: number;
    fileCount: number;
    organCounts: number; /* HCA Specific */
    primarySite: string|number;
    primarySiteCount: number;
    projectCount: number;
    sampleCount: number;
    totalFileSize: number;
}
