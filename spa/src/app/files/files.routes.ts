/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File-related routes.
 */

// Core dependencies
import { Route } from "@angular/router";

// App dependencies
import { FilesComponent } from "./files.component";
import { HCAProjectComponent } from "./hca-project/hca-project.component";

export const routes: Route[] = [
    {
        path: "files",
        component: FilesComponent
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
