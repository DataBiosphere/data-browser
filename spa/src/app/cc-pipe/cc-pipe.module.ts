import { NgModule } from "@angular/core";
import { FileSizePipe } from "./file-size/file-size.pipe";
import { LocaleStringPipe } from "./locale-string/locale-string.pipe";
import { CamelToSpacePipe } from "./camel-to-space/camel-to-space.pipe";

const pipes = [
    FileSizePipe,
    LocaleStringPipe,
    CamelToSpacePipe
];

@NgModule({
    imports: [],
    declarations: pipes,
    exports: pipes
})
export class CcPipeModule {
}
