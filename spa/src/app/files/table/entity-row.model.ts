/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of row in entity data table. Values are shared across projects, samples and files tables. Values specific to
 * each entity type are found in derived interfaces.
 */

export interface EntityRow {
    ageUnit: string;
    biologicalSex: string;
    disease: string; // Specimen disease
    donorDisease: string;
    donorCount: number;
    genusSpecies: string;
    libraryConstructionApproach?: string;
    organ: string;
    organismAge: string;
    organPart: string;
    modelOrgan: string;
    pairedEnd: string;
    projectTitle: string;
    sampleEntityType: string;
    selectedCellType: string;
    totalCells: number;
    workflow: string;
}
