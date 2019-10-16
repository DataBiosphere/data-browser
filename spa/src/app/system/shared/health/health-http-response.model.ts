/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP health response, before it is parsed into FE-friendly format (ie HealthResponse).
 */

export interface HealthHttpResponse {

    service_name: string;
    status: string;
}
