/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Base class responsible for mapping response returned from entity end points, to a model appropriate for display in
 * data table.
 */

// App dependencies
import {
    getUnspecifiedIfEmpty,
    getUnspecifiedIfNullValue,
    rollUpMetadata,
} from "../table/table-methods";
import { EntityRow } from "./entity-row.model";

export class EntityRowMapper {
    private organs;

    protected cellSuspensions;
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
        this.specimens = rollUpMetadata(row.specimens);
        this.organs = this.specimens.organ;
        this.projects = rollUpMetadata(row.projects);
        this.protocols = rollUpMetadata(row.protocols);
        this.row = row;
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
        const libraryConstructionApproach =
            this.bindLibraryConstructionApproach(
                this.protocols.libraryConstructionApproach
            );

        // Model organ should only display a value when sampleEntityType is cellLines or organoids
        const modelOrgan = getUnspecifiedIfNullValue(this.samples.modelOrgan);

        // Nucleic acid source should be displayed as "Unspecified" if it is null, or empty array
        const nucleicAcidSource = this.bindNucleicAcidSource(
            this.protocols.nucleicAcidSource
        );

        // Workflow "Analysis Protocol" should be displayed as "Unspecified" if it is null, or empty array
        const workflow = this.bindWorkflow(this.protocols.workflow);

        return {
            biologicalSex: getUnspecifiedIfNullValue(
                this.donorOrganisms.biologicalSex
            ),
            developmentStage: getUnspecifiedIfNullValue(
                this.donorOrganisms.developmentStage
            ),
            disease: getUnspecifiedIfNullValue(this.specimens.disease),
            donorDisease: getUnspecifiedIfNullValue(
                this.donorOrganisms.disease
            ),
            donorCount: getUnspecifiedIfNullValue(
                this.donorOrganisms.donorCount
            ),
            genusSpecies: getUnspecifiedIfNullValue(
                this.donorOrganisms.genusSpecies
            ),
            libraryConstructionApproach,
            modelOrgan,
            nucleicAcidSource,
            organ: getUnspecifiedIfNullValue(this.organs),
            organismAge: getUnspecifiedIfNullValue(
                this.donorOrganisms.organismAge
            ),
            organPart: getUnspecifiedIfNullValue(this.specimens.organPart),
            pairedEnd: getUnspecifiedIfNullValue(this.protocols.pairedEnd),
            projectTitle: getUnspecifiedIfNullValue(this.projects.projectTitle),
            sampleEntityType: getUnspecifiedIfNullValue(
                this.samples.sampleEntityType
            ),
            selectedCellType: getUnspecifiedIfNullValue(
                this.cellSuspensions.selectedCellType
            ),
            totalCells: getUnspecifiedIfNullValue(
                this.cellSuspensions.totalCells
            ),
            workflow,
        };
    }

    /**
     * Bind library construction approach response value. Library construction approach should be displayed as
     * "Unspecified" if it is null, or empty array
     *
     * @param {string} libraryConstructionApproach
     * @returns {string}
     */
    private bindLibraryConstructionApproach(
        libraryConstructionApproach: string
    ): string {
        return Array.isArray(libraryConstructionApproach)
            ? getUnspecifiedIfEmpty(libraryConstructionApproach)
            : getUnspecifiedIfNullValue(libraryConstructionApproach);
    }

    /**
     * Bind nucleic acid source response value. Nucleic acid source should be displayed as "Unspecified"
     * if it is null, or empty array.
     *
     * @param {string} nucleicAcidSource
     * @returns {string}
     */
    private bindNucleicAcidSource(nucleicAcidSource: string): string {
        return Array.isArray(nucleicAcidSource)
            ? getUnspecifiedIfEmpty(nucleicAcidSource)
            : getUnspecifiedIfNullValue(nucleicAcidSource);
    }

    /**
     * Bind workflow response value. Workflow "Analysis Protocol" should be displayed as "Unspecified" if it is null,
     * or empty array.
     *
     * @param {string} workflow
     * @returns {string}
     */
    private bindWorkflow(workflow: string): string {
        return Array.isArray(workflow)
            ? getUnspecifiedIfEmpty(workflow)
            : getUnspecifiedIfNullValue(workflow);
    }
}
