/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of response returned from Azul's /index/catalogs endpoint.
 */

export interface CatalogsAPIResponse {
    default_catalog: string;
    catalogs: any;
}
