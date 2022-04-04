/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Shared pipes module.
 */

// Core dependencies
import { NgModule } from "@angular/core";

// App dependencies
import { CountSizePipe } from "./count-size/count-size.pipe";
import { FileSizePipe } from "./file-size/file-size.pipe";
import { LocaleStringPipe } from "./locale-string/locale-string.pipe";
import { CamelToSpacePipe } from "./camel-to-space/camel-to-space.pipe";

const pipes = [CamelToSpacePipe, CountSizePipe, FileSizePipe, LocaleStringPipe];

@NgModule({
    imports: [],
    declarations: pipes,
    exports: pipes,
})
export class PipeModule {}
