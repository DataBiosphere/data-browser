/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a sample row in data table.
 */

// App dependencies
import { EntityRow } from "../entities/entity-row.model";

export interface SampleRow extends EntityRow {
    sampleId: string;
}
