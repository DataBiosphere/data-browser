/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from samples end point, to a model appropriate for display in
 * samples data table.
 */

// App dependencies
import { EntityRow } from "../table/entity-row.model";
import { FileTypeSummariesRowMapper } from "../table/file-type-summaries-row-mapper";
import { getSelfOrFirst, getUnspecifiedIfNullValue } from "../table/table-methods";

export class SampleRowMapper extends FileTypeSummariesRowMapper {

    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {
        super(row);
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {
        return Object.assign({}, super.mapRow(), {
            sampleId: getSelfOrFirst(this.samples.id),
            libraryConstructionApproach: getUnspecifiedIfNullValue(this.protocols.libraryConstructionApproach)
        });
    }
}
