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
    protected v2;

    /**
     * @param {boolean} v2 - true if running in v2 environment
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(v2: boolean, row: any) {

        this.cellSuspensions = rollUpMetadata(v2, row.cellSuspensions);
        this.donorOrganisms = rollUpMetadata(v2, row.donorOrganisms);
        this.samples = rollUpMetadata(v2, row.samples);
        this.specimens = rollUpMetadata(v2, row.specimens);
        this.organs = this.specimens.organ;
        this.projects = rollUpMetadata(v2, row.projects);
        this.protocols = rollUpMetadata(v2, row.protocols);
        this.row = row;
        this.v2 = v2;
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

        // Nucleic acid source should be displayed as "Unspecified" if it is null, or empty array - always map but 
        // only displayed in v2 environments
        const nucleicAcidSource = this.protocols.nucleicAcidSource;
        const mappedNucleicAcidSource = Array.isArray(nucleicAcidSource) ?
            getUnspecifiedIfEmpty(nucleicAcidSource) :
            getUnspecifiedIfNullValue(nucleicAcidSource);

        // Workflow "Analysis Protocol" should be displayed as "Unspecified" if it is null, or empty array
        const workflow = this.protocols.workflow;
        const mappedWorkflow = Array.isArray(workflow) ?
            getUnspecifiedIfEmpty(workflow) :
            getUnspecifiedIfNullValue(workflow);

        // Model organ should only display a value when sampleEntityType is cellLines or organoids
        const modelOrgan = this.samples.modelOrgan ? this.samples.modelOrgan : null;

        return {
            ageUnit: getUnspecifiedIfNullValue(this.donorOrganisms.organismAgeUnit),
            biologicalSex: getUnspecifiedIfNullValue(this.donorOrganisms.biologicalSex),
            developmentStage: getUnspecifiedIfNullValue(this.donorOrganisms.developmentStage), //  Always map but only displayed in v2 environments
            disease: getUnspecifiedIfNullValue(this.specimens.disease),
            donorDisease: getUnspecifiedIfNullValue(this.donorOrganisms.disease),
            donorCount: getUnspecifiedIfNullValue(this.donorOrganisms.donorCount),
            genusSpecies: getUnspecifiedIfNullValue(this.donorOrganisms.genusSpecies),
            libraryConstructionApproach: mappedLibraryConstructionApproach,
            modelOrgan: modelOrgan,
            nucleicAcidSource: mappedNucleicAcidSource,
            organ: getUnspecifiedIfNullValue(this.organs),
            organismAge: getUnspecifiedIfNullValue(this.donorOrganisms.organismAge),
            organPart: getUnspecifiedIfNullValue(this.specimens.organPart),
            pairedEnd: getUnspecifiedIfNullValue(this.protocols.pairedEnd),
            projectTitle: getUnspecifiedIfNullValue(this.projects.projectTitle),
            sampleEntityType: getUnspecifiedIfNullValue(this.samples.sampleEntityType),
            selectedCellType: getUnspecifiedIfNullValue(this.cellSuspensions.selectedCellType),
            totalCells: getUnspecifiedIfNullValue(this.cellSuspensions.totalCells),
            workflow: mappedWorkflow
        };
    }
}
