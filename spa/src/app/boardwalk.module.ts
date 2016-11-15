import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { BoardwalkComponent } from "./boardwalk.component";

import { boardwalkRoutes } from "./boardwalk.routes";
import { FilesModule } from "./files/files.module";
import { reducers } from "./shared/boardwalk.reducer";

@NgModule({
    bootstrap: [BoardwalkComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(boardwalkRoutes),

        StoreModule.provideStore(reducers),

        FilesModule
    ],
    declarations: [
        BoardwalkComponent
    ]
})
export class BoardwalkModule {
}
