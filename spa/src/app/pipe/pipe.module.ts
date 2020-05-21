import { NgModule } from "@angular/core";
import { CountSizePipe } from "./count-size/count-size.pipe";
import { FileSizePipe } from "./file-size/file-size.pipe";
import { LocaleStringPipe } from "./locale-string/locale-string.pipe";
import { CamelToSpacePipe } from "./camel-to-space/camel-to-space.pipe";

const pipes = [
    CountSizePipe,
    FileSizePipe,
    LocaleStringPipe,
    CamelToSpacePipe
];

@NgModule({
    imports: [],
    declarations: pipes,
    exports: pipes
})
export class PipeModule {
}
