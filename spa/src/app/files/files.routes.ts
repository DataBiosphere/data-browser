import { Route } from "@angular/router";
import { FilesComponent } from "./files.component";

export const routes: Route[] = [
    {
        path: "files",
        component: FilesComponent
    },
    {
        path: "specimens",
        component: FilesComponent
    },
    {
        path: "projects",
        component: FilesComponent
    }
];
