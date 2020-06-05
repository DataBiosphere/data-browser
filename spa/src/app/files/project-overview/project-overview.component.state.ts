/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project overview component.
 */

// App dependencies
import { ProjectView } from "../project-view/project-view.model";
import { SearchTerm } from "../search/search-term.model";

export interface ProjectOverviewComponentState {

    projectShortname: string;
    project: ProjectView;
    selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>
}
