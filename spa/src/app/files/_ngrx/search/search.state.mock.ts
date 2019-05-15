/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of possible search states, and related values.
 */

// App dependencies
import { FileFacetName } from "../../shared/file-facet-name.model";
import { SearchEntity } from "../../search/search-entity.model";
import { SearchState } from "./search.state";

/**
 * Project ID and name used when mocking a project-related object (SearchEntity, SelectProjectIdAction etc)
 */
export const PROJECT_1M_NEURONS = {
    id: "46c58e08-4518-4e45-acfe-bdab2434975d",
    name: "1M Neurons"
};

/**
 * Return a new search state with a selected project.
 *
 * @returns {SearchState}
 */
export function selectProject(): SearchState {

    const projectSearchTerm =
        new SearchEntity(FileFacetName.PROJECT_ID,
            PROJECT_1M_NEURONS.id,
            PROJECT_1M_NEURONS.name,
            1);

    return new SearchState([], new Map([
        [FileFacetName.PROJECT_ID, new Set([projectSearchTerm])]
    ]));
}
