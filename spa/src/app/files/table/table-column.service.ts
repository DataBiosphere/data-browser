/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for organizing table column display name and description.
 * Used in the table header.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { TableColumn } from "./table-column.model";

@Injectable()
export class TableColumnService {

    // File facet groupings
    public readonly TABLE_COLUMNS: TableColumn[] = [

        {
            columnName: "biologicalSex",
            columnDisplayName: "Sex",
            columnDescription: "The biological sex of the organism. Should be one of male, female, mixed, or unknown."
        },
        {
            columnName: "disease",
            columnDisplayName: "Known Diseases",
            columnDescription: "Free text describing any disease association to the cell type. Should be an EFO ontology."
        },
        {
            columnName: "donorCount",
            columnDisplayName: "Donor Count",
        },
        {
            columnName: "fileCount",
            columnDisplayName: "File Count",
            columnDescription: "The count of files for this specimen."
        },
        {
            columnName: "fileFormat",
            columnDisplayName: "File Format",
            columnDescription: "The format of the file."
        },
        {
            columnName: "fileName",
            columnDisplayName: "File Name",
            columnDescription: "The filename of the data file."
        },
        {
            columnName: "fileSize",
            columnDisplayName: "File Size",
            columnDescription: "The file size of the data file."
        },
        {
            columnName: "fileType",
            columnDisplayName: "Data",
            columnDescription: "The format of the data file."
        },
        {
            columnName: "genusSpecies",
            columnDisplayName: "Species",
            columnDescription: "The scientific binomial name for the species of the biomaterial."
        },
        {
            columnName: "libraryConstructionApproach",
            columnDisplayName: "Library Construction Approach",
            columnDescription: "The general method for sequencing library construction."
        },
        {
            columnName: "organ",
            columnDisplayName: "Organ",
            columnDescription: "The organ that the biomaterial came from. Blood and connective tissue are considered organs."
        },
        {
            columnName: "organPart",
            columnDisplayName: "Organ Part",
            columnDescription: "A term for a specific part of the organ that the biomaterial came from."
        },
        {
            columnName: "organismAge",
            columnDisplayName: "Age",
            columnDescription: "Age, measured since birth. Age unit is the unit in which age is expressed. Must be one of hour, day, week, month, or year."
        },
        {
            columnName: "projectTitle",
            columnDisplayName: "Project Name",
            columnDescription: "The project name of the data file."
        },
        {
            columnName: "sampleEntityType",
            columnDisplayName: "Sample Type",
        },
        {
            columnName: "selectedCellType",
            columnDisplayName: "Selected Cell Type",
            columnDescription: "The cell type(s) selected to be present in the suspension."
        },
        {
            columnName: "specimenId",
            columnDisplayName: "Specimen Id",
            columnDescription: "A unique ID for this specimen."
        },
        {
            columnName: "totalCells",
            columnDisplayName: "Estimated Cell Count",
            columnDescription: "Total estimated number of cells in biomaterial. May be 1 for well-based assays."
        }
    ];

    /**
     * Determines the table column.
     * @param {string} columnName
     * @returns {TableColumn[]}
     */
    public getColumn(columnName: string): TableColumn[] {

        return this.TABLE_COLUMNS.filter(column => column.columnName === columnName);
    }
}
