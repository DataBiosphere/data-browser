/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Config module definition.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigService } from "./config.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [ConfigService]
})
export class ConfigModule {
}
