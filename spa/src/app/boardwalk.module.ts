import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { BoardwalkComponent } from "./boardwalk.component";

import { boardwalkRoutes } from "./boardwalk.routes";
import { reducers } from "./files/reducer";
import { FilesModule } from "./files/files.module";

@NgModule({
    bootstrap: [BoardwalkComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(boardwalkRoutes),

        StoreModule.provideStore(reducers),

        // RepositoryModule
        FilesModule
    ],
    declarations: [
        BoardwalkComponent
    ]
})
export class BoardwalkModule {
}
