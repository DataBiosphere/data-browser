/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a project row in data table.
 */

// App dependencies
import { EntityRow } from "../entities/entity-row.model";
import { FileTypeSummariesRow } from "../table/file-type-summaries-row.model";

export interface ProjectRow extends EntityRow, FileTypeSummariesRow {
    contributorMatrices?: any;
    entryId: string;
    matrices?: any;
    projectShortname: string;
}
