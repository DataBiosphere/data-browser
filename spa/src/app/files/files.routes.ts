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
import { HCAProjectComponent } from "./hca-project/hca-project.component";

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
                component: HCAProjectComponent
            }
        ]
    }
];
