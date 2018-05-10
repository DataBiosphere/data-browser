// Core dependencies
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

// App dependencies

/**
 * Component displaying three summary counts: files, donors, and file size.
 */
@Component({
    selector: "bw-file-filter",
    templateUrl: "./file-filter.component.html",
    styleUrls: ["./file-filter.component.scss"],
})

export class FileFilterComponent {

    // locals
    removable = true;
    // options = [
    //     "One",
    //     "Two",
    //     "Three"
    // ];
    // filteredOptions: Observable<string[]>;
    // myControl: FormControl = new FormControl();

    ngOnInit() {
        // this.filteredOptions = this.myControl.valueChanges
        //     .pipe(
        //         startWith(""),
        //         map(val => this.filter(val))
        //     );
    }

    // filter(val: string): string[] {
    //     return this.options.facet.terms.filter(option =>
    //         option.toLowerCase().includes(val.toLowerCase()));
    // }
}
