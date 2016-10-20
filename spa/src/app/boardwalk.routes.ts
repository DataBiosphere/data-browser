import { Route } from "@angular/router";

export const boardwalkRoutes: Route[] = [
    { path: "", redirectTo: "/repository", pathMatch: "full" },
    { path: "repository", loadChildren: "./repository/repository.module#RepositoryModule" }
];
