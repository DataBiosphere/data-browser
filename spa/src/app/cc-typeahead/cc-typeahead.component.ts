// Core dependencies
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MdInput } from "@angular/material";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";

// App dependencies
import { CCTypeaheadSearchEvent } from "./cc-typeahead-search.event";


@Component({
    selector: "cc-typeahead",
    templateUrl: "./cc-typeahead.component.html",
    styleUrls: ["./cc-typeahead.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcTypeaheadComponent implements OnInit {

    // Locals
    searchTerm = new FormControl();

    // Inputs
    @Input() placeholder: string;

    // Outputs
    @Output() search = new EventEmitter<CCTypeaheadSearchEvent>();

    // View child/ren // TODO Dave
    @ViewChild(MdInput) mdSearchInput: MdInput;

    /**
     * Public API
     */

    /**
     * Clear the current value of the typeahead and immediately trigger search update.
     */
    public clear(): void { // clear on close TODO Dave

        this.searchTerm.setValue("", {
            emitEvent: false // Don't trigger valueChanges, debounce time is too long to trigger search
        });
        this.triggerSearchChanged("");
    }

    /**
     * Set focus on the search input.
     */
    public focus(): void { // focus on open TODO Dave

        this.mdSearchInput.focus();
    }

    /**
     * Privates
     */

    /**
     * Set up initial state
     */
    private initState(): void {

        // Set default placeholder value if not specified
        this.placeholder = this.placeholder || "Search";

        // Hook up subscription to input changes
        this.searchTerm.valueChanges
            .debounceTime(333)
            .distinctUntilChanged()
            .subscribe(term => {
                this.triggerSearchChanged(term);
            });
    }

    /**
     * Let listeners know that search term has been changed
     *
     * @param searchTerm {string}
     */
    private triggerSearchChanged(searchTerm: string) {

        this.search.emit(new CCTypeaheadSearchEvent(searchTerm));
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
