/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table methods.
 */

/**
 * Public API
 */

// App dependencies
import { TableColumn } from "./table-column.model";

let TABLE_COLUMNS: TableColumn[] = [

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
 * Returns age and ageUnit.
 * @param age
 * @param ageUnit
 * @returns {string}
 */
export function getAge(age: string, ageUnit: string): string {

    let ageUnitTruncated = getAgeUnit(ageUnit);

    if ( age && age !== "Unspecified" ) {

        return age + " " + ageUnitTruncated;
    }

    return "Unspecified";
}

/**
 * Returns ageUnit, truncated at first character
 * @param ageUnit
 * @returns {string}
 */
export function getAgeUnit(ageUnit: string): string {

    if ( ageUnit ) {
        return ageUnit.charAt(0);
    }
}

/**
 * Determines the table column.
 * @param {string} columnName
 * @returns {TableColumn}
 */
export function getColumn(columnName: string): TableColumn {

    return TABLE_COLUMNS.filter(column => column.columnName === columnName)[0];
}

/**
 * Returns the column description.
 * Used by table header tooltip.
 * @param {string} columnName
 * @returns {string}
 */
export function getColumnDescription(columnName: string): string {

    let column = getColumn(columnName);
    return column.columnDescription ? `${column.columnDisplayName}: ${column.columnDescription}` : `${column.columnDisplayName}.`;
}

/**
 * Returns the column name to display as table header.
 * @param {string} columnName
 * @returns {string}
 */
export function getColumnDisplayName(columnName: string): string {

    return getColumn(columnName).columnDisplayName;
}

/**
 * Returns "--" if count is zero, otherwise returns count.
 * @param {number} count
 * @returns {any}
 */
export function getCountDisplay(count: number): any {

    return count === 0 ? "--" : count;
}

/**
 * Returns the count for file type.
 * @param {string} fileTypeName
 * @param {any[]} fileTypeSummaries
 * @returns {number}
 */
export function getFileCount(fileTypeName: string, fileTypeSummaries: any[]): number {

    let fileTypeSummary = fileTypeSummaries.find(fileSummary => fileSummary.fileType === fileTypeName);

    // Returns a count if fileType exists, otherwise returns 0.
    if ( fileTypeSummary ) {

        return fileTypeSummary.count;
    }

    return 0;
}

/**
 * Returns "Paired End", "Single End" or "Unspecified" for pairedEnd value.
 * @param {string} pairedEnd
 * @returns {string}
 */
export function getPairedEnd(pairedEnd: string): string {

    if ( pairedEnd ) {

        return (pairedEnd.split(",").map(p => {

            p = p.trim();

            if ( p === "true" ) {
                return "Paired End";
            }
            else if ( p === "false" ) {
                return "Single End";
            }
            return "Unspecified";

        }).join(", "));
    }

    return "Unspecified";
}

/**
 * Returns first value.
 * @param value
 * @returns {any}
 */
export function getSelfOrFirst(value) {

    if ( !value ) {

        return "";
    }

    const vals = value.split(", ");
    return vals[0];
}

/**
 * Returns the value if it is specified, otherwise returns "Unspecified" if value null.
 * @param {any} value
 * @returns {any}
 */
export function getUnspecifiedIfNullValue(value: any): any {

    if ( value ) {

        return value;
    }

    return "Unspecified";
}

/**
 * Returns false (tooltip not to be disabled) if the width of the parent container is smaller than the element of interest.
 * If false, an ellipsis has been applied to the text and a tooltip will show the element's content.
 * @param el
 * @returns {boolean}
 */
export function isTooltipDisabled(el) {

    return !( el.parentElement.getBoundingClientRect().width < el.getBoundingClientRect().width );
}

/**
 * Each bundle contains multiple biomaterials which are in a hierarchy
 * leading back to the root biomaterial. Biomaterials are in an array.
 * This rolls up the metadata values to a single object.
 * @param array
 * @returns {any}
 */
export function rollUpMetadata(array): any {

    // if the array is empty we have no values.
    if ( !array ) {
        return {};
    }

    // for each element in the array
    const rollup = array.reduce((acc, element) => {

        // get its own keys and their values.
        Object.keys(element).forEach((key) => {
            let value = element[key];

            // skip null values
            if ( value ) {

                // flatten arrays
                if ( value instanceof Array ) {
                    value = value.join(", ");
                }


                if ( key === "totalCells" ) {

                    if ( acc[key] ) {
                        acc[key] = acc[key] + value;
                    }
                    else {
                        acc[key] = value;
                    }

                }
                else {

                    // if the value is different from an existing key...
                    let cellValues;

                    try {
                        cellValues = acc[key] ? acc[key].split(", ") : [];
                    }
                    catch (error) {
                        console.log(key);
                        console.log(value);
                        console.log(acc[key]);
                        return;
                    }


                    if ( cellValues.length ) {
                        if ( !cellValues.some(cellValue => cellValue === value) ) {
                            // append the value to the existing key
                            acc[key] = acc[key] + ", " + value;
                        }
                    }
                    else {
                        // if no existing key or the values are the same just set the value.
                        acc[key] = value;
                    }
                }
            }
        });

        return acc;

    }, {});

    return rollup;

}
