// Core dependencies
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

//NGRX
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ActionReducer } from "@ngrx/store";

import { Dictionary } from "./shared/dictionary";


// App Dependencies
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

//Chiled Modules
import { FilesModule } from "./files/files.module";

//Effects
import { FilesEffects } from "./files/shared/files.effects";
import { KeywordsEffects } from "./keywords/shared/keywords.effects";


//Import and ombine all reducers to a single object.
import * as fromFiles from "./files/files.reducer";
import * as fromKeywords from "./keywords/reducer";

const reducers: Dictionary<ActionReducer<any>> = Object.assign({},
    fromFiles.reducers,
    fromKeywords.reducers)


//OK lets go...
@NgModule({
    bootstrap: [AppComponent],
    imports: [

        //ANGULAR SETUP
        BrowserModule,
        RouterModule.forRoot(routes),

        //NGRX SETUP MODEL/REDUCERS SETUP
        StoreModule.provideStore(reducers),

        //NGRX EFFECTS SETUP
        EffectsModule.run(KeywordsEffects),
        EffectsModule.run(FilesEffects),

        //CHILD MODULES SETUP
        FilesModule
    ],
    declarations: [
        AppComponent
    ]
})
export class AppModule {
}

