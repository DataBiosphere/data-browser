/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get species form component.
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { CheckboxOption } from "./checkbox-option.model";

export interface SpeciesFormComponentState {
    loaded: boolean;
    speciesCheckboxOptions?: CheckboxOption[];
    speciesFileFacet?: Facet;
}
