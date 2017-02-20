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
import { CGLFooterComponent } from "./shared/cgl-footer/cgl-footer.component";
import { CGLFooterNavComponent } from "./shared/cgl-footer/cgl-footer-nav/cgl-footer-nav.component";
import { CGLFooterNavItemComponent } from "./shared/cgl-footer/cgl-footer-nav-item/cgl-footer-nav-item.component";
import { CCHamburgerDirective } from "./shared/cc-hamburger/cc-hamburger.directive";
import { CGLSubnavComponent } from "./shared/cgl-subnav/cgl-subnav.component";
import { CGLToolbarComponent } from "./shared/cgl-toolbar/cgl-toolbar.component";
import { Dictionary } from "./shared/dictionary";

// Child Modules
import { CCSnapperModule } from "./cc-snapper/cc-snapper.module";
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


/**
 * Code app module definition - imports shared and config modules as well as all app specific modules that must either
 * be eager-loaded or contain app-wide singleton services.
 */
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
        FilesModule,
        CCSnapperModule

    ],
    declarations: [

        AppComponent,

        // Nav components
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CGLFooterComponent,
        CGLFooterNavComponent,
        CGLFooterNavItemComponent,
        CCHamburgerDirective,
        CGLSubnavComponent,
        CGLToolbarComponent
    ]
})
export class AppModule {
}

