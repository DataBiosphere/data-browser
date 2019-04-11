/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Selectors for querying file-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector } from "@ngrx/store";

// App dependencies
import { FileSummaryState } from "../file-summary/file-summary.state";

export const selectFileManifestFileSummary = createFeatureSelector<FileSummaryState>("fileManifestFileSummary");
