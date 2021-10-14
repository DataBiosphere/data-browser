/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of accession associated with a project returned from Azul projects or project API endpoints.
 */

// App dependencies
import { AccessionNamespace } from "./accession-namespace.model";

export interface Accession {
    namespace: AccessionNamespace;
    accession: string;
}
