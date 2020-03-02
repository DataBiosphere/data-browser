/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File-related routes.
 */

// Core dependencies
import { Route } from "@angular/router";

// App dependencies
import { FilesComponent } from "./files.component";
import { HCAGetDataComponent } from "./hca-get-data/hca-get-data.component";
import { ProjectDataCitationComponent } from "./project-data-citation/project-data-citation.component";
import { ProjectDownloadManifestModalContainerComponent } from "./project-download-manifest-modal-container/project-download-manifest-modal-container.component";
import { ProjectDownloadMatrixModalContainerComponent } from "./project-download-matrix-modal-container/project-download-matrix-modal-container.component";
import { ProjectExpressionMatricesComponent } from "./project-expression-matrices/project-expression-matrices.component";
import { ProjectExternalResourcesComponent } from "./project-external-resources/project-external-resources.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectSummaryStatsComponent } from "./project-summary-stats-component/project-summary-stats.component";
import { ProjectSupplementaryLinksComponent } from "./project-supplementary-links/project-supplementary-links.component";
import { ProjectReleaseComponent } from "./releases/project-release/project-release.component";
import { ReleaseComponent } from "./releases/release.component";

export const routes: Route[] = [
    {
        path: "files",
        component: FilesComponent
    },
    {
        path: "get-data",
        component: HCAGetDataComponent
    },
    {
        path: "samples",
        component: FilesComponent
    },
    {
        path: "projects",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: FilesComponent
            },
            {
                path: ":id",
                component: ProjectGuardComponent,
                children: [{
                    path: "",
                    pathMatch: "full",
                    component: ProjectOverviewComponent
                },
                    {
                        path: "project-metadata",
                        component: ProjectMetadataComponent
                    },
                    {
                        path: "expression-matrices",
                        component: ProjectExpressionMatricesComponent
                    },
                    {
                        path: "supplementary-links",
                        component: ProjectSupplementaryLinksComponent
                    },
                    {
                        path: "external-resources",
                        component: ProjectExternalResourcesComponent
                    },
                    {
                        path: "summary-stats",
                        component: ProjectSummaryStatsComponent
                    },
                    {
                        path: "data-citation",
                        component: ProjectDataCitationComponent
                    },
                    {
                        path: "releases/2020-mar",
                        component: ProjectReleaseComponent
                    }]
            },
            {
                path: ":id/m/project-metadata",
                component: ProjectDownloadManifestModalContainerComponent
            },
            {
                path: ":id/m/expression-matrices",
                component: ProjectDownloadMatrixModalContainerComponent
            }
        ]
    },
    {
        path: "releases/2020-mar",
        component: ReleaseComponent
    }
];
