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
import { BrowserCanActivateGuard } from "./shared/routing/browser.can-activate.guard";

export const AppRoutes: Route[] = [
    {
        path: "",
        canActivate: [BrowserCanActivateGuard],
        children: [
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
        ]
    }
];
