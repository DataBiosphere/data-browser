import {
  Attribute,
  DataDictionary,
} from "@databiosphere/findable-ui/lib/common/entities";

/**
 * Returns a data dictionary built from the given data dictionary.
 * @param dataDictionary - The data dictionary.
 * @returns The built data dictionary.
 */
export function buildDataDictionary(
  dataDictionary: DataDictionary
): DataDictionary<Attribute> {
  return {
    ...dataDictionary,
    classes: dataDictionary.classes.map((classData) => {
      return {
        ...classData,
        attributes: classData.attributes.map((attribute) => {
          return {
            ...attribute,
          };
        }),
      };
    }),
  };
}
