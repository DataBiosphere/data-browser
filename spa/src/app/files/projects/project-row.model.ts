/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a project row in data table.
 */

// App dependencies
import { EntityRow } from "../entities/entity-row.model";

export interface ProjectRow extends EntityRow {
    aggregateSubmissionDate: string;
    aggregateUpdateDate: string;
    contributorMatrices?: any;
    entryId: string;
    fileTypeCounts: Map<string, number>; // Project-specific counts of file types, mapped from fileTypeSummaries 
    matrices?: any;
    projectShortname: string;
}
