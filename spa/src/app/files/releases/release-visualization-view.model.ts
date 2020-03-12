/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of a visualization of a study, included in a project.
 */

// App dependencies
import { ReleaseVisualization } from "./release-visualization.model";

export interface ReleaseVisualizationView {

    description: string;
    releaseVisualisations: ReleaseVisualization[];
}
