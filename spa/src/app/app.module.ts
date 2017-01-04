// Core dependencies
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@angular/material";

// NGRX
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ActionReducer } from "@ngrx/store";

// App Dependencies
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { CCToolbarNavComponent } from "./shared/cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavItemComponent } from "./shared/cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { CGLSubnavComponent } from "./shared/cgl-subnav/cgl-subnav.component";
import { CGLToolbarComponent } from "./shared/cgl-toolbar/cgl-toolbar.component";
import { Dictionary } from "./shared/dictionary";

// Child Modules
import { FilesModule } from "./files/files.module";

// Effects
import { FilesEffects } from "./files/shared/files.effects";
import { KeywordsEffects } from "./keywords/shared/keywords.effects";

//Import and combine all reducers to a single object.
import * as fromFiles from "./files/files.reducer";
import * as fromKeywords from "./keywords/reducer";

const reducers: Dictionary<ActionReducer<any>> = Object.assign({},
    fromFiles.reducers,
    fromKeywords.reducers);


// OK let's go...
@NgModule({
    bootstrap: [AppComponent],
    imports: [

        // ANGULAR SETUP
        BrowserModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),

        // NGRX SETUP MODEL/REDUCERS SETUP
        StoreModule.provideStore(reducers),

        // NGRX EFFECTS SETUP
        EffectsModule.run(KeywordsEffects),
        EffectsModule.run(FilesEffects),

        // CHILD MODULES SETUP
        FilesModule
    ],
    declarations: [
        AppComponent,

        // Nav components
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CGLSubnavComponent,
        CGLToolbarComponent
    ]
})
export class AppModule {
}

