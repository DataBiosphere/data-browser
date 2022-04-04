/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying execution environment form.
 */

// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";

// App dependencies
import { BulkDownloadExecutionEnvironment } from "../bulk-download/bulk-download-execution-environment.model";
import { RadioOption } from "./radio-option.model";

@Component({
    selector: "execution-environment-form",
    templateUrl: "./execution-environment-form.component.html",
    styleUrls: ["./execution-environment-form.component.scss"],
})
export class ExecutionEnvironmentFormComponent {
    // Template variables
    public executionEnvironments: RadioOption[] = [
        {
            label: "Bash",
            value: BulkDownloadExecutionEnvironment.BASH,
        },
        {
            label: "cmd.exe",
            value: BulkDownloadExecutionEnvironment.CMD_EXE,
        },
    ];
    public executionEnvironmentFormGroup: FormGroup;

    // Inputs/outputs
    @Input() executionEnvironment: BulkDownloadExecutionEnvironment; // Selected execution environment
    @Output() executionEnvironmentSelected =
        new EventEmitter<BulkDownloadExecutionEnvironment>();

    /**
     * Set up form group and form control backing form.
     */
    constructor() {
        this.executionEnvironmentFormGroup = new FormGroup({
            executionEnvironment: new FormControl(""),
        });
    }

    /**
     * Handle select of execution environment radio button.
     *
     * @param {MatRadioChange} event
     */
    public onExecutionEnvironmentSelected(event: MatRadioChange) {
        this.executionEnvironmentSelected.emit(event.value);
    }

    /**
     * Update radio button value on change of selected execution environment.
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.executionEnvironment) {
            this.executionEnvironmentFormGroup.patchValue({
                executionEnvironment: changes.executionEnvironment.currentValue,
            });
        }
    }
}
