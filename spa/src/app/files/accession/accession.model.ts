/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of accession, including URL, associated with a project.
 */

export interface Accession {
    id: string; // Accession value
    label: string; // Accession namespace
    url: string;
}
