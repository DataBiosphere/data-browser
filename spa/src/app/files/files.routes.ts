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
import { ProjectDownloadMatrixModalContainerComponent } from "./project-download-matrix-modal-container/project-download-matrix-modal-container.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";

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
                component: ProjectGuardComponent
                
            },
            {
                path: ":id/prepared-expression-matrices",
                component: ProjectDownloadMatrixModalContainerComponent
            }
        ]
    }
];
