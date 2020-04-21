/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of top-level routes used by HCA Data Portal.
 */

// Core dependencies
import { Route } from "@angular/router";

// App components
import { ErrorComponent } from "./system/error/error.component";
import { NotFoundComponent } from "./system/not-found/not-found.component";

export const AppRoutes: Route[] = [
    {
        path: "",
        redirectTo: "/projects",
        pathMatch: "full"
    }, {
        path: "error",
        component: ErrorComponent
    }, {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "/projects",
        pathMatch: "full"
    }
];
