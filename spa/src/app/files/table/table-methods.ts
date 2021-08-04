/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table methods.
 */

// App dependencies
import {
    ColumnAlignment, ColumnFlexDirection, CountType, OverflowType, PositionType,
    TableColumn
} from "./table-column.model";

/* TableColumn array.
 * Provides user friendly name and description for each table column matColumnDef.
 * Description is used by column header tooltip */
let tableColumns: TableColumn[] = [

    {
        key: "biologicalSex",
        userFriendly: "Sex",
        description: "The biological sex of the organism. Should be one of male, female, mixed, or unknown.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "contentDescription",
        userFriendly: "Content Description",
        description: "General description of the contents of the file.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "developmentStage",
        userFriendly: "Development Stage",
        description: "A classification of the developmental stage of the organism.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "disease",
        userFriendly: "Disease Status (Specimen)",
        description: "Short description of known disease(s) of the specimen.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 120,
        columnSort: true,
        columnSortKey: "specimenDisease",
        countName: "specimenDisease",
        countType: CountType.DOMAIN_COUNT

    },
    {
        key: "donorDisease",
        userFriendly: "Disease Status (Donor)",
        description: "Short description of known disease(s) of the organism.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 120,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT

    },
    {
        key: "donorCount",
        userFriendly: "Donor Count",
        alignment: ColumnAlignment.RIGHT,
        columnMinWidth: 60,
        columnSort: true,
        countType: CountType.NONE

    },
    {
        key: "fileCount",
        userFriendly: "File Count",
        description: "The count of files for this specimen.",
        alignment: ColumnAlignment.RIGHT,
        countType: CountType.NONE,
        columnSort: false,
    },
    {
        key: "fileFormat",
        userFriendly: "File Format",
        description: "The format of the file.",
        alignment: ColumnAlignment.LEFT,
        columnMaxWidth: 88,
        columnMinWidth: 80,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "fileName",
        userFriendly: "File Name",
        description: "The filename of the data file.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 300,
        columnSort: true,
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "fileSize",
        userFriendly: "File Size",
        description: "The file size of the data file.",
        alignment: ColumnAlignment.RIGHT,
        columnMaxWidth: 112,
        columnSort: true,
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "fileSource",
        userFriendly: "File Source",
        description: "The source of the file.",
        alignment: ColumnAlignment.LEFT,
        columnMaxWidth: 120,
        columnMinWidth: 120,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "genusSpecies",
        userFriendly: "Species",
        description: "The scientific binomial name for the species of the biomaterial.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 64,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "getData",
        userFriendly: "Project Downloads",
        description: "Full project downloads.",
        alignment: ColumnAlignment.CENTER,
        columnOverflow: OverflowType.VISIBLE,
        columnFlexValue: "none",
        columnMaxWidth: 140,
        columnMinWidth: 140,
        columnPosition: PositionType.RELATIVE,
        columnSort: false,
        countType: CountType.NONE
    },
    {
        key: "libraryConstructionApproach",
        userFriendly: "Library Construction Method",
        description: "The general method for sequencing library construction.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 96,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "modelOrgan",
        userFriendly: "Model Organ",
        description: "Organ for which the cell line / organoid is a model.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 100,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "nucleicAcidSource",
        userFriendly: "Nucleic Acid Source",
        description: `Source cells or organelles from which nucleic acid molecules were collected. Should be one of: "bulk cell", "single cell", "single nucleus", "bulk nuclei" or "mitochondria".`,
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },    
    {
        key: "organ",
        userFriendly: "Organ",
        description: "The organ that the biomaterial came from. Blood and connective tissue are considered organs.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 100,
        columnSort: true,
        columnSortKey: "specimenOrgan",
        countName: "specimenOrgan",
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "organPart",
        userFriendly: "Organ Part",
        description: "A term for a specific part of the organ that the biomaterial came from.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countName: "specimenOrganPart",
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "organismAge",
        userFriendly: "Age",
        description: "Age, measured since birth. Age unit is the unit in which age is expressed. Must be one of hour, day, week, month, or year.",
        alignment: ColumnAlignment.RIGHT,
        columnMaxWidth: 100,
        columnSort: true,
        countType: CountType.NONE
    },
    {
        key: "pairedEnd",
        userFriendly: "Paired End",
        description: "Whether the sequenced molecule was sequenced from both ends.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "projectShortname",
        userFriendly: "Project Label",
        description: "A short name for the project.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.NONE
    },
    {
        key: "projectTitle",
        userFriendly: "Project Title",
        description: "An official title for the project.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 300,
        columnSort: true,
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "sampleEntityType",
        userFriendly: "Sample Type",
        description: "The type of the biomaterial used to create the cell suspension. Will be one of cell line, organoid, or specimen.",
        alignment: ColumnAlignment.LEFT,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "sampleId",
        userFriendly: "Sample Id",
        description: "A unique ID for this sample.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 100,
        columnSort: true,
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "selectedCellType",
        userFriendly: "Selected Cell Type",
        description: "The cell type(s) selected to be present in the suspension.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 70,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "totalCells",
        userFriendly: "Cell Count Estimate",
        description: "Total estimated number of cells in biomaterial. May be 1 for well-based assays.",
        descriptionFiles: "Total estimated number of cells in biomaterial. May be 1 for well-based assays.",
        descriptionProjects: "Total estimated number of cells in biomaterial.",
        descriptionSamples: "Total estimated number of cells in biomaterial.",
        alignment: ColumnAlignment.RIGHT,
        columnSort: true,
        columnSortKey: "cellCount",
        columnTitleWidth: 64,
        countType: CountType.NONE
    },
    {
        key: "workflow",
        userFriendly: "Analysis Protocol",
        description: "The type of protocol.",
        alignment: ColumnAlignment.LEFT,
        columnMinWidth: 120,
        columnSort: true,
        countType: CountType.DOMAIN_COUNT
    }
];

let tableColumn = new Map<string, TableColumn>();

tableColumns.forEach((column) => {
    tableColumn.set(column.key, column);
});

/**
 * Returns column alignment for specified column.
 *
 * @param {string} column
 * @returns {string}
 */
export function getColumnAlignment(column: string): string {

    return ColumnAlignment[tableColumn.get(column).alignment];
}

/**
 * Return the set of CSS class names that are applicable to the table columns.
 *
 * @param {string} column
 * @returns {[className: string]: boolean}
 */
export function getColumnClass(column: string): { [className: string]: boolean } {

    return {
        center: getColumnAlignment(column) === "CENTER",
        "flex-column": getColumnFlexDirection(column) === "COLUMN",
        right: getColumnAlignment(column) === "RIGHT"
    };
}

/**
 * Returns count type for specified column.
 *
 * @param {string} column
 * @returns {string}
 */
export function getColumnCountType(column: string): string {

    return CountType[tableColumn.get(column).countType];
}

/**
 * Returns count name for specified column if specified, otherwise returns the column name.
 *
 * @param {string} columnName
 * @returns {string}
 */
export function getColumnCountName(columnName: string): string {

    return tableColumn.get(columnName).countName || columnName;
}

/**
 * Returns the column description.
 * Used by table header tooltip.
 * EntityName used to distinguish different descriptions between table views (project, sample, file).
 *
 * @param {string} column
 * @param {string} entityName
 * @returns {string}
 */
export function getColumnDescription(column: string, entityName: string = ""): string {

    const description = `description${entityName}`;

    return tableColumn.get(column)[description] ?
        `${tableColumn.get(column).userFriendly}: ${tableColumn.get(column)[description]}` : `${tableColumn.get(column).userFriendly}.`;
}

/**
 * Returns the column name to display as table header.
 *
 * @param {string} column
 * @returns {string}
 */
export function getColumnDisplayName(column: string): string {

    return tableColumn.get(column).userFriendly;
}

/**
 * Returns column flex direction for specified column.
 *
 * @param {string} column
 * @returns {string}
 */
export function getColumnFlexDirection(column: string): string {

    return ColumnFlexDirection[tableColumn.get(column).columnFlexDirection];
}

/**
 * Returns column sort key for column sort.
 *
 * @param {string} column
 * @returns {string}
 */
export function getColumnSortKey(column: string): string {

    const col = tableColumn.get(column);
    if ( !col ) {

        return "";
    }

    const columnSortKey = col.columnSortKey;
    if ( !columnSortKey ) {

        return "";
    }

    return columnSortKey;
}

/**
 * Return the inline style configuration for the column.
 *
 * @param {string} column
 * @returns {any}
 */
export function getColumnStyle(column: string): any {

    let columnFlexValue = tableColumn.get(column).columnFlexValue;
    let columnMaxWidth = tableColumn.get(column).columnMaxWidth;
    let columnMinWidth = tableColumn.get(column).columnMinWidth;
    let columnOverflow = tableColumn.get(column).columnOverflow;
    let columnPosition = tableColumn.get(column).columnPosition;

    return {
        "flex": columnFlexValue ? columnFlexValue : {},
        "max-width": columnMaxWidth ? columnMaxWidth + "px" : {},
        "min-width": columnMinWidth ? columnMinWidth + "px" : {},
        "overflow": columnOverflow ? columnOverflow : {},
        "position": columnPosition ? columnPosition : {}
    };
}

/**
 * Returns first value.
 *
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
 * Return the inline style configuration for component hca-tooltip.
 *
 * @param {string} column
 * @returns {any}
 */
export function getTooltipStyle(column: string): any {

    const col = tableColumn.get(column);

    if ( !col ) {

        return {};
    }

    const columnTitleWidth = col.columnTitleWidth;

    if ( !columnTitleWidth ) {

        return {};
    }

    return {
        "width": columnTitleWidth + "px"
    }
}

/**
 * Returns the value if it is specified, otherwise returns "Unspecified" if the value is null/unspecified or the array is empty.
 *
 * @param value
 */
export function getUnspecifiedIfNullOrEmptyValue(value: any[]): any {

    if ( value && value.length && value[0] ) {
        
        return value;
    }

    return "Unspecified";
}

/**
 * Returns the value if it is specified, otherwise returns "Unspecified" if value null/unspecifed.
 *
 * @param {any} value
 * @returns {any}
 */
export function getUnspecifiedIfNullValue(value: any): any {

    if ( value || value === 0 || value === false ) {

        return value;
    }

    return "Unspecified";
}

/**
 * Returns the value if it is specified, otherwise returns "Unspecified" if array is empty.
 *
 * @param {any} value
 * @returns {any}
 */
export function getUnspecifiedIfEmpty(value: any[]): any {

    if ( value.length ) {
        return value;
    }

    return "Unspecified";
}

/**
 * Returns true if the column may be sorted.
 *
 * @param {string} column
 * @returns {string}
 */
export function isColumnSort(column: string): boolean {

    return tableColumn.get(column).columnSort;
}

/**
 * Returns true if the cell content is "Unspecified".
 *
 * @param {string} element
 * @returns {boolean}
 */
export function isElementUnspecified(element: string): boolean {

    return element === "Unspecified";
}

/**
 * Returns a single string that is a concatenation of all elements in the specified array. For example, given
 *
 * [{one: "1", two: "2"}, {one: "11", two: "22", three: 3}]
 *
 * the following object is returned:
 *
 * {
 *   one: "1, 11",
 *   two: "2, 22",
 *   three: "3"
 * }
 *
 * Note, all flattened values - with the exception of totalCells and donorCount - are cast to string values.
 * 
 * TODO move table methods to service structure during refactor of tables (#1245)
 * TODO fix immutability of array values (#1579)
 *
 * @param {any[]} array
 * @returns {any}
 */
export function rollUpMetadata(array: any[]): any {

    // Return empty object if no array is specified
    if ( !array ) {
        return {};
    }

    // for each element in the array
    const rollup = array.reduce((acc, element) => {

        // get its own keys and their values.
        Object.keys(element).forEach((key) => {
            let value = element[key];

            // skip null/undefined values
            if ( value || value === 0) {

                // flatten arrays
                if ( value instanceof Array ) {
                    
                    value = rollupMetadataArray(key, value);
                }

                if ( key === "totalCells" || key === "donorCount" ) {

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

/**
 * Returns a single string value for the specified array, converting null values to Unspecified.
 * 
 * Function is exported to facilitate access in specs.
 *
 * TODO fix immutability of value arg (#1579)
 *
 * @param {string} key
 * @param {any} value
 */
export function rollupMetadataArray(key: string, value: any): string {

    // Convert nested objects into comma-separated values
    if ( key === "organismAge" ) {

        value = flattenOrganismAge(value);
    }

    // Convert any null or undefined values in array to Unspecified
    value = value.map((elementVal) => getUnspecifiedIfNullValue(elementVal));
    
    return value.join(", ");
}

/**
 * Flatten age and age unit object values into string values.
 * 
 * @param {any} organismAge - {value: "50 - 55", unit: "year"}
 * @returns {string}
 */
function flattenOrganismAge(value): string {

    return (value || []).reduce((accum, age) => {

        // If age is null, add to accum as is and this will be converted to "Unspecified"
        if ( !age ) {
            accum.push(null);
            return accum;
        }

        let formattedAge = getUnspecifiedIfNullValue(age.value);
        if ( age.unit ) { // Only add unit if there is a value
            const truncatedUnit = age.unit.charAt(0); // For example, convert year to y
            formattedAge += ` ${truncatedUnit}`;
        }

        accum.push(formattedAge);
        return accum;
    }, []);
}
