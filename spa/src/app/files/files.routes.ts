/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File-related routes.
 */

// Core dependencies
import { Route } from "@angular/router";

// App dependencies
import { CatalogCanActivateGuard } from "./catalog/catalog.can-activate.guard";
import { FilterCanActivateGuard } from "./facet/filter/filter-can-activate.guard";
import { FilesComponent } from "./files.component";
import { HCAGetDataComponent } from "./hca-get-data/hca-get-data.component";
import { ProjectDataCitationComponent } from "./project-data-citation/project-data-citation.component";
import { ProjectDownloadManifestModalContainerComponent } from "./project-download-manifest-modal-container/project-download-manifest-modal-container.component";
import { ProjectMatrixDownloadModalContainerComponent } from "./project-matrix-download-modal-container/project-matrix-download-modal-container.component";
import { ProjectExternalResourcesComponent } from "./project-external-resources/project-external-resources.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectMatricesComponent } from "./project-matrices/project-matrices.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectSummaryStatsComponent } from "./project-summary-stats-component/project-summary-stats.component";
import { BrowserCanActivateGuard } from "../shared/routing/browser.can-activate.guard";

export const routes: Route[] = [
    {
        path: "files",
        canActivate: [BrowserCanActivateGuard, CatalogCanActivateGuard, FilterCanActivateGuard],
        component: FilesComponent
    },
    {
        path: "get-data",
        canActivate: [BrowserCanActivateGuard, CatalogCanActivateGuard, FilterCanActivateGuard],
        component: HCAGetDataComponent
    },
    {
        path: "samples",
        canActivate: [BrowserCanActivateGuard, CatalogCanActivateGuard, FilterCanActivateGuard],
        component: FilesComponent
    },
    {
        path: "projects",
        canActivate: [BrowserCanActivateGuard],
        canActivateChild: [CatalogCanActivateGuard],
        children: [
            {
                path: "",
                pathMatch: "full",
                canActivate: [FilterCanActivateGuard],
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
                    }
                ]
            },
            {
                path: ":id/m/project-metadata",
                component: ProjectDownloadManifestModalContainerComponent
            },
            {
                path: ":id/m/expression-matrices",
                component: ProjectMatrixDownloadModalContainerComponent
            }
        ]
    }
];
