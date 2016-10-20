import { NgModule } from "@angular/core";
import { FileSizePipe } from "./file-size/file-size.pipe";
import { LocaleStringPipe } from "./locale-string/locale-string.pipe";

const pipes = [
    FileSizePipe,
    LocaleStringPipe
];

@NgModule({
    imports: [],
    declarations: pipes,
    exports: pipes
})
export class CcPipeModule {
}
