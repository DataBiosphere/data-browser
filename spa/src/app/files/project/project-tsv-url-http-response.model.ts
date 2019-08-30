/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP project TSV URL response, before it is parsed into FE-friendly format (ie ProjectTSVUrlResponse).
 */

export interface ProjectTSVUrlHttpResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}
