// Core modules
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { CCBaseDAO } from "./shared";

/**
 * Pure service-based module for HTTP-related functionality.
 */
@NgModule({
    imports: [

        // Core modules
        HttpModule
    ],
    exports: [

        HttpModule
    ],
    providers: [

        CCBaseDAO
    ]
})
export class CCHttpModule {}
