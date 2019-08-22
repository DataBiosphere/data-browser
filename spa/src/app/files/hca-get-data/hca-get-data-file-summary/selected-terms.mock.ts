/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of input selected terms.
 */

// App dependencies
import { Term } from "../../shared/term.model";

// Selected terms
export const DEFAULT_SELECTED_TERMS = [
    new Term("Homo sapiens", 22, true),
    new Term("Mus musculus", 123, true),
    new Term("Fastq", 233, true)
];

// Selected genus species terms
export const DEFAULT_SELECTED_GENUS_SPECIES_TERMS = [
    new Term("Homo sapiens", 22, true),
    new Term("Mus musculus", 123, true)
];

// Selected library construction method terms
export const DEFAULT_SELECTED_LIBRARY_CONSTRUCTION_METHOD_TERMS = [
    new Term("Drop-seq", 22, true),
    new Term("10x 3' v3 sequencing", 22, true),
    new Term("Smart-seq2", 22, true),
];

// Selected paired end terms
export const DEFAULT_SELECTED_PAIRED_END_TERMS = [
    new Term("true", 234, true)
];
