/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download button which is disabled when indexing is in progress.
 */

// Core dependencies
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { DownloadButtonComponentState } from "./download-button.component.state";
import { AppState } from "../../_ngrx/app.state";
import { selectSystemStatusIndexing } from "../../system/_ngrx/system.selectors";

@Component({
    selector: "download-button",
    templateUrl: "./download-button.component.html",
    styleUrls: ["./download-button.component.scss"],
})
export class DownloadButtonComponent implements OnInit {
    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public state$ = new BehaviorSubject<DownloadButtonComponentState>({
        loaded: false,
    });

    // Inputs
    @Input() disabled: boolean;
    @Input() icon: boolean; // True if download icon should be displayed, false if button should be displayed.
    @Output() downloadClicked = new EventEmitter<boolean>();

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Returns true if either the disabled input is true, or if indexing is in progress.
     *
     * @param {boolean} disabledState
     */
    public isDisabled(disabledState: boolean): boolean {
        return this.disabled || disabledState;
    }

    /**
     * Only display tooltip if the disabled input is false and indexing is not in progress.
     *
     * @param {boolean} disabledState
     */
    public isTooltipDisabled(disabledState: boolean): boolean {
        if (this.disabled) {
            return true;
        }

        return !disabledState;
    }

    /**
     * Let parents know download button has been clicked.
     */
    public onDownloadClicked() {
        this.downloadClicked.emit(true);
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Check indexing status; disable download buttonn if indexing is currently in progress.
     */
    public ngOnInit() {
        this.store
            .pipe(
                select(selectSystemStatusIndexing),
                takeUntil(this.ngDestroy$)
            )
            .subscribe((indexing: boolean) => {
                this.state$.next({
                    loaded: true,
                    disabled: indexing,
                });
            });
    }
}
