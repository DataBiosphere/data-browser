import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "fileSize"
})
export class FileSizePipe implements PipeTransform {

    transform(value: number): string {

        const fileSizes = ["B", "KB", "MB", "GB", "TB", "PB"];

        let val = value;
        let sigFig = 0;
        while (val >= 1024) {
            val = val / 1024;
            sigFig += 1;
        }
        const roundedValue = val.toFixed(2);
        return `${roundedValue} ${fileSizes[sigFig]}`;
    }
}
