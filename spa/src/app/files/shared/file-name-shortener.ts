/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe to convert file ID from 5fe1b2e0-7fad-589c-849b-010449569587 to 5fe1b2e0....010449569587
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "fileNameShortener"
})
export class FileNameShortenerPipe implements PipeTransform {

    transform(value: string): string {

        if ( !value ) {
            return "";
        }

        return value.replace(/-(\w{4}-){3}/i, "....");
    }
}
