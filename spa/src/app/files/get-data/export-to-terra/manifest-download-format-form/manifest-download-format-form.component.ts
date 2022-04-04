/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling species selection prior to get data flows.
 */

// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";

// App dependencies
import { ManifestDownloadFormat } from "../../../file-manifest/manifest-download-format.model";

@Component({
    selector: "manifest-download-format-form",
    templateUrl: "./manifest-download-format-form.component.html",
    styleUrls: ["./manifest-download-format-form.component.scss"],
})
export class ManifestDownloadFormatFormComponent implements OnChanges {
    // Locals
    public formatFormGroup: FormGroup;

    // Inputs
    @Input() format: ManifestDownloadFormat; // Selected format
    @Input() formats: ManifestDownloadFormat[];

    // Outputs
    @Output() formatSelected = new EventEmitter<ManifestDownloadFormat>();

    /**
     * Set up form group and form control backing format form.
     */
    constructor() {
        this.formatFormGroup = new FormGroup({
            format: new FormControl(this.format),
        });
    }

    /**
     * Handle select of format radio button.
     *
     * @param {MatRadioChange} event
     */
    public onFormatSelected(event: MatRadioChange) {
        this.formatSelected.emit(event.value);
    }

    /**
     * Update radio button value.
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.format) {
            this.formatFormGroup.patchValue({
                format: changes.format.currentValue,
            });
        }
    }
}
