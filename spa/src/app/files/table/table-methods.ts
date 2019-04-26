/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Table methods.
 */

// Each bundle contains multiple biomaterials which are in a hierarchy
// leading back to the root biomaterial. Biomaterials are in an array.
// This rolls up the metadata values to a single object.

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
