/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying facet age range.
 */

// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";

// App dependencies
import { AgeRange } from "../age-range.model";
import { AgeUnit } from "../age-unit.model";
import { AgeInAgeUnit } from "./age-in-age-unit.pipe";
import { AgeUnitInAgeUnit } from "./age-unit-in-age-unit.pipe";
import { AgeUnitInSeconds } from "./age-unit-in-seconds.pipe";
import { MinMaxValidator } from "./min-max.validator";

@Component({
    selector: "facet-age-range-form",
    templateUrl: "./facet-age-range-form.component.html",
    styleUrls: ["./facet-age-range-form.component.scss"],
})
export class FacetAgeRangeFormComponent implements OnDestroy, OnInit {
    // Locals
    public ageRangeGroup: FormGroup;

    // Template variables
    public pristine: boolean = true; // True if user has not yet submitted the form since form was first displayed on menu open
    private ngDestroy$ = new Subject();

    // Inputs
    @Input() ageRange: AgeRange;

    //Outputs
    @Output() applyFacet = new EventEmitter<AgeRange>();
    @Output() clearFacet = new EventEmitter<AgeRange>();

    /**
     * Set up form group and form control backing age range form.
     */
    constructor() {
        this.ageRangeGroup = new FormGroup(
            {
                ageMax: new FormControl("", Validators.required),
                ageMin: new FormControl("", Validators.required),
                ageUnit: new FormControl(AgeUnit.year),
            },
            {
                validators: MinMaxValidator(),
            }
        );
    }

    /**
     * Returns true if an age range is currently applied and can therefore be cleared.
     *
     * @param {AgeRange} appliedAgeRange
     * @returns {boolean}
     */
    public isClearable(appliedAgeRange: AgeRange): boolean {
        return this.isAgeRangeApplied(appliedAgeRange);
    }

    /**
     * Returns true if form is valid, and has been updated in the case of an edit, and can be submitted.
     *
     * @param {FormGroup} formGroup
     * @returns {boolean}
     */
    public isSubmittable(formGroup: FormGroup): boolean {
        return formGroup.dirty && formGroup.valid;
    }

    /**
     * Returns true if required error messages should be displayed.
     *
     * @param {FormGroup} formGroup
     * @returns {boolean}
     */
    public isMinMaxError(formGroup: FormGroup): boolean {
        return (
            !formGroup.valid && formGroup.errors && !!formGroup.errors.minMax
        );
    }

    /**
     * Let parent components know that an age range has been selected and facet selection can now be updated. Reset
     * form flags (dirty, touched etc) so that we can toggle enabled state of Apply button.
     *
     *
     * @param {FormGroup} formGroup
     */
    public onApply(formGroup: FormGroup) {
        // Form is no longer pristine for this menu session
        this.pristine = false;

        // Let parent component know age range is to be applied
        const ageRangeInSeconds = this.buildAgeRangeInSeconds(formGroup.value);
        this.applyFacet.emit(ageRangeInSeconds);

        // Reset form flags
        formGroup.reset(formGroup.value);
    }

    /**
     * Let parent know the age range has been cleared.
     *
     * @param {FormGroup} formGroup
     * @param {AgeRange} appliedAgeRange
     */
    public onClearAgeRange(formGroup: FormGroup, appliedAgeRange: AgeRange) {
        // Reset pristine for this session
        this.pristine = true;

        const ageRangeInSeconds = this.buildAgeRangeInSeconds(formGroup.value);
        this.clearAgeRange(formGroup);

        // If an age range is specified and saved in the store, clear it
        if (this.isAgeRangeApplied(appliedAgeRange)) {
            this.clearFacet.emit(ageRangeInSeconds);
        }
    }

    /**
     * Builds age range object from specified form values, transforming age min and max to seconds.
     *
     * @param {AgeRange} ageRange
     * @returns {AgeRange}
     */
    private buildAgeRangeInSeconds(ageRange: AgeRange): AgeRange {
        const ageUnitInSeconds = new AgeUnitInSeconds();
        return {
            ageMax: ageUnitInSeconds.transform(
                ageRange.ageMax,
                ageRange.ageUnit
            ),
            ageMin: ageUnitInSeconds.transform(
                ageRange.ageMin,
                ageRange.ageUnit
            ),
            ageUnit: ageRange.ageUnit,
        };
    }

    /**
     * Clear age range.
     *
     * @param {FormGroup} formGroup
     */
    private clearAgeRange(formGroup: FormGroup) {
        formGroup.setValue({
            ageMin: null,
            ageMax: null,
            ageUnit: AgeUnit.year,
        });
    }

    /**
     * Update age range with current state, from seconds to unit.
     *
     * @param {AgeRange} ageRange
     */
    private initFormControlValues(ageRange: AgeRange) {
        const ageUnit = ageRange.ageUnit;
        const ageInAgeUnit = new AgeInAgeUnit();

        this.ageRangeGroup.patchValue({
            ageMax: ageInAgeUnit.transform(ageRange.ageMax, ageUnit),
            ageMin: ageInAgeUnit.transform(ageRange.ageMin, ageUnit),
            ageUnit: ageUnit,
        });
    }

    /**
     * Returns true if there is currently an age range applied - checks the AgeRange input value to determine if there
     * is currently a value.
     *
     * @param {AgeRange} appliedAgeRange
     * @returns {boolean}
     */
    private isAgeRangeApplied(appliedAgeRange: AgeRange): boolean {
        return (
            (!!appliedAgeRange.ageMin || appliedAgeRange.ageMin === 0) &&
            (!!appliedAgeRange.ageMax || appliedAgeRange.ageMax === 0)
        );
    }

    /**
     * Update age range to display in current age unit.
     *
     * @param {FormGroup} ageRangeGroup
     * @param {AgeUnit} prevUnit
     * @param {AgeUnit} nextUnit
     */
    private onAgeUnitChange(
        ageRangeGroup: FormGroup,
        prevUnit: AgeUnit,
        nextUnit: AgeUnit
    ) {
        const ageMax = ageRangeGroup.get("ageMax").value;
        const ageMin = ageRangeGroup.get("ageMin").value;
        const ageUnitInAgeUnit = new AgeUnitInAgeUnit();

        ageRangeGroup.patchValue({
            ageMax: ageUnitInAgeUnit.transform(ageMax, prevUnit, nextUnit),
            ageMin: ageUnitInAgeUnit.transform(ageMin, prevUnit, nextUnit),
        });
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Initialize form controls and listeners on changes in form values.
     */
    public ngOnInit() {
        this.initFormControlValues(this.ageRange);
    }
}
