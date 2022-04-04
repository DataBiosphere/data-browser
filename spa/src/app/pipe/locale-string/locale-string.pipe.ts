import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "localeString",
})
export class LocaleStringPipe implements PipeTransform {
    transform(value: number, args?: string): string {
        let result: string;
        if (args) {
            result = value.toLocaleString(args);
        } else {
            result = value.toLocaleString();
        }
        return result;
    }
}
