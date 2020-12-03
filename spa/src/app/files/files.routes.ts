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
import { ProjectExternalResourcesComponent } from "./project-external-resources/project-external-resources.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectMatricesComponent } from "./project-matrices/project-matrices.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectSummaryStatsComponent } from "./project-summary-stats-component/project-summary-stats.component";
import { BrowserCanActivateGuard } from "../shared/routing/browser.can-activate.guard";
import { ProjectsCanActivateGuard } from "./project/projects.can-activate.guard";

export const routes: Route[] = [
    {
        path: "files",
        canActivate: [BrowserCanActivateGuard],
        component: FilesComponent
    },
    {
        path: "get-data",
        canActivate: [BrowserCanActivateGuard],
        component: HCAGetDataComponent
    },
    {
        path: "samples",
        canActivate: [BrowserCanActivateGuard],
        component: FilesComponent
    },
    {
        path: "projects",
        canActivate: [BrowserCanActivateGuard],
        children: [
            {
                path: "",
                pathMatch: "full",
                canActivate: [ProjectsCanActivateGuard],
                component: FilesComponent
            },
            {
                path: ":id",
                component: ProjectGuardComponent,
                children: [
                    {
                        path: "",
                        pathMatch: "full",
                        component: ProjectOverviewComponent
                    },
                    {
                        path: "project-metadata",
                        component: ProjectMetadataComponent,
                    },
                    {
                        path: "expression-matrices",
                        component: ProjectMatricesComponent
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
                    }/*, Disabled - #1358
                    {
                        path: "releases/2020-mar",
                        component: ProjectReleaseComponent
                    }*/
                ]
            },
            {
                path: ":id/m/project-metadata",
                component: ProjectDownloadManifestModalContainerComponent
            },
            {
                path: ":id/m/expression-matrices",
                component: ProjectDownloadMatrixModalContainerComponent
            }/*,  Disabled - #1358
            {
                path: ":id/m/releases/2020-mar/datasets/:datasetId/release-files",
                component: ReleaseFilesModalContainerComponent,
            },
            {
                path: ":id/m/releases/2020-mar/datasets/:datasetId/visualizations",
                component: ReleaseVisualizationsModalContainerComponent,
            }*/
        ]
    }/*, Disabled - #1358
    {
        path: "releases/2020-mar",
        canActivate: [BrowserCanActivateGuard],
        component: ReleaseComponent
    }*/
];
