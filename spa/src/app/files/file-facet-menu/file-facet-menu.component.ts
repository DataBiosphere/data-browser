// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    Output
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies
import { SelectFileFacetAction } from "../actions/select-file-facet.action";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { selectFileFacetByName } from "../files.reducer";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { FileFacet } from "../shared/file-facet.model";

@Component({
    selector: "bw-file-facet-menu",
    templateUrl: "./file-facet-menu.component.html",
    styleUrls: ["./file-facet-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetMenuComponent implements OnDestroy, OnInit {

    // Privates
    private store: Store<BoardwalkStore>;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // Inputs
    @Input() fileFacetName: string;
    private fileFacet$: Observable<FileFacet>;
    private fileFacet: FileFacet;
    private subscription;

    /**
     * @param store {Store<BoardwalkStore>}
     */
    constructor(store: Store<BoardwalkStore>) {

        this.store = store;
    }

    /**
     * Public API
     */

    /**
     * Term has been selected from edit mode, emit select event to parent.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Emit close menu event
     */
    onClickCloseMenu(): void {

        this.closeMenu.emit();
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up subscriptions.
     */
    ngOnInit() {

        // TODO revisit selector/reducer/function thingo here.
        this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
        this.subscription = this.fileFacet$.subscribe((fileFacet) => {
            this.fileFacet = fileFacet;
        });
    }

    /**
     * Tear down.
     */
    ngOnDestroy() {

        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }
}
