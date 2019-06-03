/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Config module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";

// App dependencies
import { ConfigService } from "./config.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [ConfigService]
})
export class ConfigModule {
}
