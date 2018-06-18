/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Set of top-level routes used by Boardwalk.
 */

// Core dependencies
import { Route } from "@angular/router";

export const AppRoutes: Route[] = [
    { path: "", redirectTo: "/", pathMatch: "full" },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
    // { path: "files", loadChildren: "./files/files.module#FilesModule" } // TODO revisit - do we need lazy loading here? does this conflict with including FilesModule in app module?
];
