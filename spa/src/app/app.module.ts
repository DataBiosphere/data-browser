/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Code app module definition - imports shared and config modules as well as all app specific modules that must either
 * be eager-loaded or contain app-wide singleton services.
 */

// Core dependencies
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { DeviceDetectorModule } from "ngx-device-detector";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// App Dependencies
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { UserService } from "./data/user/user.service";
import { FilesModule } from "./files/files.module";
import { AppReducers } from "./_ngrx/app.reducer";
import { HCAEncodeHttpParamsInterceptor } from "./http/hca-encode-http-params.interceptor";
import { HCAHttpResponseErrorInterceptor } from "./http/hca-http-response-error.interceptor";
import { AppEffects } from "./_ngrx/app.effects";
import { SharedModule } from "./shared/shared.module";
import { CCHamburgerDirective } from "./site/cc-hamburger/cc-hamburger.directive";
import { HCAFooterComponent } from "./site/hca-footer/hca-footer.component";
import { HCAToolbarComponent } from "./site/hca-toolbar/hca-toolbar.component";
import { NotFoundComponent } from "./system/not-found/not-found.component";
import { ErrorComponent } from "./system/error/error.component";
import { SystemService } from "./system/shared/system.service";

@NgModule({
    bootstrap: [AppComponent],
    imports: [

        // ANGULAR SETUP
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        // NGRX SETUP
        StoreModule.forRoot(AppReducers),
        EffectsModule.forRoot(AppEffects),
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        }),

        // CHILD MODULES SETUP
        SharedModule,
        ConfigModule,
        FilesModule,
        DeviceDetectorModule.forRoot()
    ],
    declarations: [

        AppComponent,

        // HTTP components
        ErrorComponent,
        NotFoundComponent,

        // Site components
        CCHamburgerDirective,
        HCAFooterComponent,
        HCAToolbarComponent
    ],
    providers: [
        SystemService,
        UserService,
        // Bootstrap config from API end point, must return function from useFactory method, when function is invoked,
        // must return promise to ensure Angular "pauses" until config is resolved from API end point.
        {
            provide: APP_INITIALIZER,
            useFactory: (configService: ConfigService) => {
                return () => {
                    return configService.initConfig();
                };
            },
            deps: [ConfigService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAEncodeHttpParamsInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HCAHttpResponseErrorInterceptor,
            deps: [Router, Store],
            multi: true
        }
    ]
})
export class AppModule {
}

