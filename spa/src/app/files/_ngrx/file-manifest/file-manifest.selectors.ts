/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying file manifest-related state from the file store.
 */

// Core dependencies
import { createFeatureSelector } from "@ngrx/store";

// App dependencies
import { FileSummaryState } from "../file-summary/file-summary.state";

export const selectFileManifestFileSummary = createFeatureSelector<FileSummaryState>("fileManifestFileSummary");
