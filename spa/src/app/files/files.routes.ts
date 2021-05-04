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
import { BulkDownloadComponent } from "./get-data/bulk-download/bulk-download.component";
import { GetDataComponent } from "./get-data/get-data.component";
import { ExportToTerraComponent } from "./get-data/export-to-terra/export-to-terra.component";
import { GetDataOptionsComponent } from "./get-data/get-data-options/get-data-options.component";
import { ManifestDownloadComponent } from "./get-data/manifest-download/manifest-download.component";
import { ProjectDataCitationComponent } from "./project-data-citation/project-data-citation.component";
import { ProjectManifestDownloadModalContainerComponent } from "./project-manifest-download-modal-container/project-manifest-download-modal-container.component";
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
        path: "export",
        canActivate: [BrowserCanActivateGuard],
        canActivateChild: [CatalogCanActivateGuard, FilterCanActivateGuard],
        component: GetDataComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                component: GetDataOptionsComponent
            },
            {
                path: "get-curl-command",
                component: BulkDownloadComponent
            },
            {
                path: "download-manifest",
                component: ManifestDownloadComponent
            },
            {
                path: "export-to-terra",
                component: ExportToTerraComponent
            }
        ]
    },
    {
        path: "get-data", // Deprecated; maintained for backwards compatibility of bookmarks.
        redirectTo: "export"
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
                        path: "project-matrices",
                        component: ProjectMatricesComponent
                    },
                    {
                        path: "expression-matrices", // Deprecated; maintained for backwards compatibility of bookmarks.
                        redirectTo: "project-matrices"
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
                component: ProjectManifestDownloadModalContainerComponent
            },
            {
                path: ":id/m/project-matrices",
                component: ProjectMatrixDownloadModalContainerComponent
            },
            {
                path: ":id/m/expression-matrices",  // Deprecated; maintained for backwards compatibility of bookmarks.
                redirectTo: ":id/m/project-matrices"
            }
        ]
    }
];
