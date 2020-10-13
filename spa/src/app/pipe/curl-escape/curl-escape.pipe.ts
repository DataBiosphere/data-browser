/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for escaping CURL URLs. Specifically, this pipe escapes single quotes and backslashes.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "camelToSpace"
})
export class CurlEscapePipe implements PipeTransform {

    transform(url: string): string {
        
        if ( !url ) {
            return "";
        }

        return url.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

    }
}
