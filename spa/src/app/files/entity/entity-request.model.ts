/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of HTTP request sent to entity API, including URL and possbility corresponding parameters.
 */

export interface EntityRequest {
    url: string;
    params?: { [key: string]: string };
}
