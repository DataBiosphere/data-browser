/**
 * Pipe for formatting count sizes.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "countSize"
})
export class CountSizePipe implements PipeTransform {

    transform(value: number): string {

        const countSizes = ["k", "M", "G", "T", "P", "E"];

        // Determine count size display value and unit
        let val = value || 0;
        let sigFig = 0;
        while (val >= 1000) {
            val = val / 1000;
            sigFig += 1;
        }

        // No format of count size - tens, hundreds
        if ( sigFig === 0 ) {
            return `${val}`;
        }

        // Format of count size to "n.0k"
        // Round value to precision
        let precision = 1;
        const roundedValue = val.toFixed(precision);
        return `${roundedValue}${countSizes[(sigFig) - 1]}`;
    }
}
