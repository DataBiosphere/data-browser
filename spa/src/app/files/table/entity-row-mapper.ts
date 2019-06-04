/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Base class responsible for mapping response returned from entity end points, to a model appropriate for display in
 * data table.
 */

// App dependencies
import { getUnspecifiedIfNullValue, rollUpMetadata } from "./table-methods";
import { EntityRow } from "./entity-row.model";

export class EntityRowMapper {
    
    private cellSuspensions;
    private donorOrganisms;
    private organs;

    protected projects;
    protected protocols;
    protected row;
    protected samples;
    protected specimens;

    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {

        this.cellSuspensions = rollUpMetadata(row.cellSuspensions);
        this.donorOrganisms = rollUpMetadata(row.donorOrganisms);
        this.samples = rollUpMetadata(row.samples);
        this.organs = this.samples.organ;
        this.projects = rollUpMetadata(row.projects);
        this.protocols = rollUpMetadata(row.protocols);
        this.row = row;
        this.specimens = rollUpMetadata(row.specimens);
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        return {
            ageUnit: this.donorOrganisms.organismAgeUnit,
            biologicalSex: getUnspecifiedIfNullValue(this.donorOrganisms.biologicalSex),
            disease: getUnspecifiedIfNullValue(this.samples.disease),
            genusSpecies: getUnspecifiedIfNullValue(this.donorOrganisms.genusSpecies),
            organ: getUnspecifiedIfNullValue(this.organs),
            organismAge: getUnspecifiedIfNullValue(this.donorOrganisms.organismAge),
            organPart: getUnspecifiedIfNullValue(this.samples.organPart),
            pairedEnd: getUnspecifiedIfNullValue(this.protocols.pairedEnd),
            projectTitle: getUnspecifiedIfNullValue(this.projects.projectTitle),
            sampleEntityType: getUnspecifiedIfNullValue(this.samples.sampleEntityType),
            selectedCellType: getUnspecifiedIfNullValue(this.cellSuspensions.selectedCellType),
            totalCells: getUnspecifiedIfNullValue(this.cellSuspensions.totalCells),
        };
    }
}
