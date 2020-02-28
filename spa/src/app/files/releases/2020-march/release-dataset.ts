/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of study of a project that is included in release.
 */

// App dependencies
import { DevelopmentalStage } from "./developmental-stage.model";
import { ReleaseFile } from "./release-file";
import { ReleaseVisualization } from "./release-visualization";
import { LibraryConstructionApproach } from "../../shared/library-construction-approach.model";

export interface ReleaseDataset {

    datasetId: string; // Short name
    developmentalStage: DevelopmentalStage;
    files: ReleaseFile[];
    libraryConstructionApproach: LibraryConstructionApproach;
    organ: string;
    visualizations: ReleaseVisualization[];
}
