import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "localeString"
})
export class LocaleStringPipe implements PipeTransform {

    transform(value: number, args?: string): string {
        return args ? value.toLocaleString() : value.toLocaleString(args);
    }
}
