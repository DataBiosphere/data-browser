/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Base class responsible for mapping response returned from entity end points, to a model appropriate for display in
 * data table.
 */

// App dependencies
import { getUnspecifiedIfEmpty, getUnspecifiedIfNullValue, rollUpMetadata } from "./table-methods";
import { EntityRow } from "./entity-row.model";

export class EntityRowMapper {

    private cellSuspensions;
    private organs;

    protected donorOrganisms;
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
     *
     * Mappings are as follows (applicable to both data tables and project detail pages):
     *
     * 1. Falsy values or empty arrays are displayed as "Undefined"
     * 2. Single values (eg ["brain"] or "brain") are displayed as a single string value (ie "brain"), with the
     *    exception of total cell count which remains as a number
     * 3. Multiple values (eg ["brain", "blood"] or {..["brain"], ...["blood"]} are rolled up to single, comma-delimited
     *    string value (ie "brain, blood"). The exception here is contributors and publications on the project detail 
     *    page as we need to pull out the contributor names etc individually for display.
     */
    public mapRow(): EntityRow {

        // Library construction approach should be displayed as "Unspecified" if it is null, or empty array
        const libraryConstructionApproach = this.protocols.libraryConstructionApproach;
        const mappedLibraryConstructionApproach = Array.isArray(libraryConstructionApproach) ?
            getUnspecifiedIfEmpty(libraryConstructionApproach) :
            getUnspecifiedIfNullValue(libraryConstructionApproach);

        // Model organ should only display a value when sampleEntityType is cellLines or organoids
        const modelOrgan = this.samples.modelOrgan ? this.samples.modelOrgan : null;

        return {
            ageUnit: getUnspecifiedIfNullValue(this.donorOrganisms.organismAgeUnit),
            biologicalSex: getUnspecifiedIfNullValue(this.donorOrganisms.biologicalSex),
            disease: getUnspecifiedIfNullValue(this.samples.disease),
            genusSpecies: getUnspecifiedIfNullValue(this.donorOrganisms.genusSpecies),
            libraryConstructionApproach: mappedLibraryConstructionApproach,
            organ: getUnspecifiedIfNullValue(this.organs),
            organismAge: getUnspecifiedIfNullValue(this.donorOrganisms.organismAge),
            organPart: getUnspecifiedIfNullValue(this.samples.organPart),
            modelOrgan: modelOrgan,
            pairedEnd: getUnspecifiedIfNullValue(this.protocols.pairedEnd),
            projectTitle: getUnspecifiedIfNullValue(this.projects.projectTitle),
            sampleEntityType: getUnspecifiedIfNullValue(this.samples.sampleEntityType),
            selectedCellType: getUnspecifiedIfNullValue(this.cellSuspensions.selectedCellType),
            totalCells: getUnspecifiedIfNullValue(this.cellSuspensions.totalCells),
        };
    }
}
