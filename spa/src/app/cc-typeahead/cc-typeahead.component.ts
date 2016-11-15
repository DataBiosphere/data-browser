import { Component, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";


@Component({
    selector: "cc-typeahead",
    templateUrl: "./cc-typeahead.component.html",
    styleUrls: ["./cc-typeahead.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcTypeaheadComponent implements OnInit {


    // Locals
    searchTerm = new FormControl();

    // Outputs
    @Output() search = new EventEmitter<String>();

    /**
     * Privates
     */

    /**
     * Set up initial state
     */
    initState(): void {

        this.searchTerm.valueChanges
            .debounceTime(333)
            // .filter((term) => {
            //     return term.length > 2;
            // })
            .distinctUntilChanged()
            .subscribe(term => this.triggerSearchChanged(term));
    }

    /**
     * Let listeners know that search term has been changed
     *
     * @param searchTerm {string}
     */
    private triggerSearchChanged(searchTerm: string) {

        this.search.emit(searchTerm);
    }

    /**
     * Life cycle events
     */

    /**
     * Set up component
     */
    ngOnInit() {

        this.initState();
    }
}
