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
import { ColumnAlignment, CountType, TableColumn } from "./table-column.model";

/* TableColumn array.
 * Provides user friendly name and description for each table column matColumnDef.
 * Description is used by column header tooltip */
let tableColumns: TableColumn[] = [

    {
        key: "biologicalSex",
        userFriendly: "Sex",
        description: "The biological sex of the organism. Should be one of male, female, mixed, or unknown.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "disease",
        userFriendly: "Known Diseases (Specimen)",
        description: "Short description of known disease(s) of the specimen.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT

    },
    {
        key: "donorCount",
        userFriendly: "Donor Count",
        alignment: ColumnAlignment.RIGHT,
        countType: CountType.NONE

    },
    {
        key: "fileCount",
        userFriendly: "File Count",
        description: "The count of files for this specimen.",
        alignment: ColumnAlignment.RIGHT,
        countType: CountType.NONE

    },
    {
        key: "fileFormat",
        userFriendly: "File Format",
        description: "The format of the file.",
        alignment: ColumnAlignment.LEFT,
        columnMaxWidth: 88,
        columnMinWidth: 80,
        countType: CountType.DOMAIN_COUNT

    },
    {
        key: "fileName",
        userFriendly: "File Name",
        description: "The filename of the data file.",
        alignment: ColumnAlignment.LEFT,
        columnFlexValue: "1 1 20%",
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "fileSize",
        userFriendly: "File Size",
        description: "The file size of the data file.",
        alignment: ColumnAlignment.RIGHT,
        columnMaxWidth: 112,
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "fileType",
        userFriendly: "Data",
        description: "The format of the data file.",
        alignment: ColumnAlignment.RIGHT,
        columnFlexValue: "none",
        countType: CountType.NONE
    },
    {
        key: "genusSpecies",
        userFriendly: "Species",
        description: "The scientific binomial name for the species of the biomaterial.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "libraryConstructionApproach",
        userFriendly: "Library Construction Approach",
        description: "The general method for sequencing library construction.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "metadataDownload",
        userFriendly: "Metadata",
        description: "Full project metadata download in .tsv format.",
        alignment: ColumnAlignment.CENTER,
        columnMaxWidth: 84,
        columnMinWidth: 84,
        countType: CountType.NONE
    },
    {
        key: "organ",
        userFriendly: "Organ",
        description: "The organ that the biomaterial came from. Blood and connective tissue are considered organs.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "organPart",
        userFriendly: "Organ Part",
        description: "A term for a specific part of the organ that the biomaterial came from.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "organismAge",
        userFriendly: "Age",
        description: "Age, measured since birth. Age unit is the unit in which age is expressed. Must be one of hour, day, week, month, or year.",
        alignment: ColumnAlignment.RIGHT,
        columnMaxWidth: 100,
        countType: CountType.NONE
    },
    {
        key: "pairedEnd",
        userFriendly: "Paired End",
        description: "Whether the sequenced molecule was sequenced from both ends.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "projectTitle",
        userFriendly: "Project Name",
        description: "The project name of the data file.",
        alignment: ColumnAlignment.LEFT,
        columnFlexValue: "0 1 20%",
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "sampleEntityType",
        userFriendly: "Sample Type",
        description: "The type of the biomaterial used to create the cell suspension. Will be one of cell line, organoid, or specimen.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "sampleId",
        userFriendly: "Sample Id",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.NONE
    },
    {
        key: "selectedCellType",
        userFriendly: "Selected Cell Type",
        description: "The cell type(s) selected to be present in the suspension.",
        alignment: ColumnAlignment.LEFT,
        countType: CountType.DOMAIN_COUNT
    },
    {
        key: "specimenId",
        userFriendly: "Specimen Id",
        description: "A unique ID for this specimen.",
        alignment: ColumnAlignment.LEFT,
        columnFlexValue: "0 1 12%",
        countType: CountType.SUMMARY_COUNT
    },
    {
        key: "totalCells",
        userFriendly: "Cell Count Estimate",
        description: "Total estimated number of cells in biomaterial. May be 1 for well-based assays.",
        alignment: ColumnAlignment.RIGHT,
        countType: CountType.NONE
    }
];

let tableColumn = new Map<string, TableColumn>();

tableColumns.forEach((column) => {
    tableColumn.set(column.key, column);
});

/**
 * Returns age and ageUnit, truncated at first character.
 * @param age
 * @param ageUnit
 * @returns {string}
 */
export function getAge(age: string, ageUnit: string): string {

    let ageUnitTruncated = ageUnit ? ageUnit.charAt(0) : null;

    if ( age && age !== "Unspecified" ) {

        return age + " " + ageUnitTruncated;
    }

    return "Unspecified";
}

/**
 * Returns column alignment for specified column.
 * @param {string} column
 * @returns {string}
 */
export function getColumnAlignment(column: string): string {

    return ColumnAlignment[tableColumn.get(column).alignment];
}

/**
 * Return the set of CSS class names that are applicable to the table columns.
 * @param {string} column
 * @returns {[className: string]: boolean}
 */
export function getColumnClass(column: string): { [className: string]: boolean } {

    return {
        "file-type": column === "fileType",
        center: getColumnAlignment(column) === "CENTER",
        right: getColumnAlignment(column) === "RIGHT"
    };
}

/**
 * Returns count type for specified column.
 * @param {string} column
 * @returns {string}
 */
export function getColumnCountType(column: string): string {

    return CountType[tableColumn.get(column).countType];
}

/**
 * Returns the column description.
 * Used by table header tooltip.
 * @param {string} column
 * @returns {string}
 */
export function getColumnDescription(column: string): string {

    return tableColumn.get(column).description ?
        `${tableColumn.get(column).userFriendly}: ${tableColumn.get(column).description}` : `${tableColumn.get(column).userFriendly}.`;
}

/**
 * Returns the column name to display as table header.
 * @param {string} column
 * @returns {string}
 */
export function getColumnDisplayName(column: string): string {

    return tableColumn.get(column).userFriendly;
}

/**
 * Return the inline style configuration for the column.
 * @param {string} column
 * @returns {any}
 */
export function getColumnStyle(column: string): any {

    let columnFlexValue = tableColumn.get(column).columnFlexValue;
    let columnMaxWidth = tableColumn.get(column).columnMaxWidth;
    let columnMinWidth = tableColumn.get(column).columnMinWidth;

    return {
        "flex": columnFlexValue ? columnFlexValue : {},
        "max-width": columnMaxWidth ? columnMaxWidth + "px" : {},
        "min-width": columnMinWidth ? columnMinWidth + "px" : {}
    };
}

/**
 * Returns "--" if file count is zero, otherwise returns count.
 * @param {number} count
 * @returns {any}
 */
export function getFileCountDisplay(count: number): any {

    return count === 0 ? "--" : count;
}

/**
 * Returns file counts for a set of file types as well as total count.
 * @param {any[]} fileTypeSummaries
 * @returns {any}
 */
export function getFileTypeCounts(fileTypeSummaries: any[]) {

    /* File counts for file formats.
     * File types of interest include "fastq.gz" and "fastq", "bam", "matrix".
     * Total file count and all remaining other files are calculated. */
    return fileTypeSummaries.reduce((acc, fileTypeSummary) => {

        /* bam */
        if ( fileTypeSummary.fileType === "bam" ) {
            acc.bamCount = acc.bamCount + fileTypeSummary.count;
        }
        /* matrix */
        if ( fileTypeSummary.fileType === "matrix" ) {
            acc.matrixCount = acc.matrixCount + fileTypeSummary.count;
        }
        /* fastq and fastq.qz */
        if ( fileTypeSummary.fileType === "fastq.gz" || fileTypeSummary.fileType === "fastq" ) {
            acc.rawCount = acc.rawCount + fileTypeSummary.count;
        }
        /* total count */
        acc.totalCount = acc.totalCount + fileTypeSummary.count;
        /* other count */
        acc.otherCount = acc.totalCount - acc.bamCount - acc.matrixCount - acc.rawCount;

        return acc;

    }, {bamCount: 0, matrixCount: 0, otherCount: 0, rawCount: 0, totalCount: 0});

}

/**
 * Return the set of CSS class names that are currently applicable to the table header row.
 * @param snapped
 * @returns {[className: string]: boolean}
 */
export function getHeaderClass(snapped): { [className: string]: boolean } {

    return {
        snapped: snapped
    };
}

/**
 * Return the set of CSS class names that are currently applicable to the first row in the table.
 * @param {number} rowIndex
 * @param snapped
 * @returns {[className: string]: boolean}
 */
export function getRowClass(rowIndex: number, snapped): { [className: string]: boolean } {

    return {
        snapped: (rowIndex === 0) && snapped
    };
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
