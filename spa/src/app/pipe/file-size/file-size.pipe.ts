/**
 * Pipe for formatting file sizes.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "fileSize"
})
export class FileSizePipe implements PipeTransform {

    transform(value: number): string {

        const fileSizes = ["B", "KB", "MB", "GB", "TB", "PB"];

        // Determine file size display value and unit
        let val = value || 0;
        let sigFig = 0;
        while (val >= 1024) {
            val = val / 1024;
            sigFig += 1;
        }
        
        // Prevent format of file size to "n.00 B" (display just "n B" instead)
        let precision = 2;
        if ( sigFig === 0 ) {
            precision = 0;
        }

        // Round value to precision
        const roundedValue = val.toFixed(precision);
        return `${roundedValue} ${fileSizes[sigFig]}`;
    }
}
