/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of raw HTTP export to Terra response, before it is parsed into FE-friendly format (ie ExportToTerraResponse).
 */

export interface ExportToTerraHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}
