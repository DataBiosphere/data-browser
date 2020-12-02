/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Pipe for displaying a project matrix file's "short name". 
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "projectMatrixFileName"
})
export class ProjectMatrixFileShortNamePipe implements PipeTransform {

    transform(value: string): string {

        if ( !value ) {
            return "";
        }
        
        return value.replace(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\./i, "");
    }
}
