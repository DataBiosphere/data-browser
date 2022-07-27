import { SelectCategory } from "../../../common/entities";
import { AzulTermFacets, LABEL } from "./entities";

/**
 * Generalize Azul term facets model into categories and category values.
 * @param termFacets - Model of term facets returned from Azul.
 * @returns Categories and category values built from Azul term facets.
 */
export function transformTermFacets(
  termFacets: AzulTermFacets
): SelectCategory[] {
  const categories: SelectCategory[] = [];

  // Build categories and category values from term facets.
  return Object.keys(termFacets).reduce((accum, key) => {
    const termFacet = termFacets[key];

    // Build category value from terms of term facet.
    const categoryValues = termFacet.terms.map((term) => ({
      count: term.count,
      key: term.term ?? LABEL.UNSPECIFIED,
      selected: false,
    }));

    // Build category and add to set of categories.
    const category: SelectCategory = {
      key,
      label: key,
      values: categoryValues,
    };
    accum.push(category);

    return accum;
  }, categories);
}
