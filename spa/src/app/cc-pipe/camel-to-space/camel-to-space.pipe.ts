/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for converting camel case strings to lower case sentence case.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "camelToSpace"
})
export class CamelToSpacePipe implements PipeTransform {

    transform(value: string): string {

        let words = value.split(/(?=[A-Z][a-z])/g);
        let firstWord = words.splice(0, 1)[0];
        firstWord = firstWord.replace(/^[a-z]/, (char) => char.toUpperCase());
        words.unshift(firstWord);
        return words.join(" ");
    }

}
