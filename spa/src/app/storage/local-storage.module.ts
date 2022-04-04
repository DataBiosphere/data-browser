/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Module specific to local storage functionality.
 */

// Core dependencies
import { NgModule } from "@angular/core";

// App Dependencies
import { LocalStorageService } from "./local-storage.service";

@NgModule({
    providers: [LocalStorageService, { provide: "Window", useValue: window }],
})
export class LocalStorageModule {}
