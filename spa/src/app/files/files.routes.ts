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
import { GetDataComponent } from "./get-data/get-data.component";
import { BulkDownloadComponent } from "./get-data/bulk-download/bulk-download.component";
import { BulkDownloadSpeciesFormComponent } from "./get-data/bulk-download-species-form/bulk-download-species-form.component";
import { GetDataOptionsComponent } from "./get-data/get-data-options/get-data-options.component";
import { ManifestDownloadComponent } from "./get-data/manifest-download/manifest-download.component";
import { ManifestDownloadSpeciesFormComponent } from "./get-data/manifest-download-species-form/manifest-download-species-form.component";
import { ExportToTerraComponent } from "./get-data/export-to-terra/export-to-terra.component";
import { ExportToTerraSpeciesFormComponent } from "./get-data/export-to-terra-species-form/export-to-terra-species-form.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectBulkDownloadComponent } from "./project-get-data/project-bulk-download/project-bulk-download.component";
import { ProjectTerraExportComponent } from "./project-get-data/project-terra-export/project-terra-export.component";
import { ProjectManifestDownloadModalContainerComponent } from "./project-manifest-download-modal-container/project-manifest-download-modal-container.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectMatricesComponent } from "./project-matrices/project-matrices.component";
import { ProjectMatrixDownloadModalContainerComponent } from "./project-matrix-download-modal-container/project-matrix-download-modal-container.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
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
                path: "get-curl-command/select-species",
                component: BulkDownloadSpeciesFormComponent
            },
            {
                path: "download-manifest",
                component: ManifestDownloadComponent
            },
            {
                path: "download-manifest/select-species",
                component: ManifestDownloadSpeciesFormComponent
            },
            {
                path: "export-to-terra",
                component: ExportToTerraComponent
            },
            {
                path: "export-to-terra/select-species",
                component: ExportToTerraSpeciesFormComponent
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
                        component: ProjectDetailComponent
                    },
                    {
                        path: "get-curl-command",
                        component: ProjectBulkDownloadComponent
                    },
                    {
                        path: "export-to-terra",
                        component: ProjectTerraExportComponent
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
                        redirectTo: ""
                    },
                    {
                        path: "external-resources", // Deprecated; maintained for backwards compatibility of bookmarks.
                        redirectTo: ""
                    },
                    {
                        path: "summary-stats", // Deprecated; maintained for backwards compatibility of bookmarks.
                        redirectTo: ""
                    },
                    {
                        path: "data-citation", // Deprecated; maintained for backwards compatibility of bookmarks.
                        redirectTo: ""
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
