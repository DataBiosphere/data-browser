// Core dependencies
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

// App dependencies
import { BoardwalkComponent } from "./boardwalk.component";
import { boardwalkRoutes } from "./boardwalk.routes";
import { FilesModule } from "./files/files.module";
import { boardWalkReducers } from "./shared/boardwalk.reducer";
import { FilesEffects } from "./files/shared/files.effects";
import { KeywordsEffects } from "./keywords/shared/keywords.effects";

@NgModule({
    bootstrap: [BoardwalkComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(boardwalkRoutes),

        StoreModule.provideStore(boardWalkReducers),
        EffectsModule.run(KeywordsEffects),
        EffectsModule.run(FilesEffects),

        FilesModule
    ],
    declarations: [
        BoardwalkComponent
    ]
})
export class BoardwalkModule {
}

