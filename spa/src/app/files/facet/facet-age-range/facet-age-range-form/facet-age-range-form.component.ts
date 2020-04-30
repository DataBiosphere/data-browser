/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying facet age range.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

// App dependencies
import { AgeRange } from "../age-range.model";
import { AgeUnit } from "../age-unit.model";
import { AgeInAgeUnit } from "./age-in-age-unit.pipe";
import { AgeUnitInAgeUnit } from "./age-unit-in-age-unit.pipe";
import { AgeUnitInSeconds } from "./age-unit-in-seconds.pipe";
import { MinMaxValidator } from "./min-max.validator";
import { Subject } from "rxjs/index";

@Component({
    selector: "facet-age-range-form",
    templateUrl: "./facet-age-range-form.component.html",
    styleUrls: ["./facet-age-range-form.component.scss"]
})
export class FacetAgeRangeFormComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();

    // Inputs
    @Input() ageRange: AgeRange;

    //Outputs
    @Output() applyFacet = new EventEmitter<AgeRange>();
    @Output() clearFacet = new EventEmitter<AgeRange>();

    // Template variables
    public ageRangeGroup = new FormGroup({
        ageMax: new FormControl("", Validators.required),
        ageMin: new FormControl("", Validators.required),
        ageUnit: new FormControl(AgeUnit.year),
    }, {
        validators: MinMaxValidator()
    });

    /**
     * Returns true if required error messages should be displayed.
     * 
     * @param {FormGroup} formGroup
     * @returns {boolean}
     */
    public isMinMaxError(formGroup: FormGroup): boolean {

        return !formGroup.valid && formGroup.errors && !!formGroup.errors.minMax;
    }

    /**
     * Let parent components know that an age range has been selected and facet selection can now be updated.
     * 
     * @param {FormGroup} formGroup
     */
    public onApply(formGroup: FormGroup) {
        
        const ageRangeInSeconds = this.buildAgeRangeInSeconds(formGroup.value);
        this.applyFacet.emit(ageRangeInSeconds);
    }

    /**
     * Let parent know the age range has been cleared.
     * 
     * @param {FormGroup} formGroup
     * @param {AgeRange} originalAgeRange
     */
    public onClearAgeRange(formGroup: FormGroup, initialAgeRange: AgeRange) {

        const ageRangeInSeconds = this.buildAgeRangeInSeconds(formGroup.value);
        this.clearAgeRange(formGroup);
        
        // If an age range is specified and saved in the store, clear it
        if ( (!!initialAgeRange.ageMin || initialAgeRange.ageMin === 0) &&
            (!!initialAgeRange.ageMax || initialAgeRange.ageMax === 0) ) {

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
            ageMax: ageUnitInSeconds.transform(ageRange.ageMax, ageRange.ageUnit),
            ageMin: ageUnitInSeconds.transform(ageRange.ageMin, ageRange.ageUnit),
            ageUnit: ageRange.ageUnit
        }
    }

    /**
     * Clear age range.
     * 
     * @param {FormGroup} FormGroup
     */
    private clearAgeRange(formGroup: FormGroup) {

        formGroup.setValue({
            ageMin: null,
            ageMax: null,
            ageUnit: AgeUnit.year
        });
    }

    /**
     * Update age range to display in current age unit.
     *
     * @param {FormGroup} ageRangeGroup
     * @param {AgeUnit} prevUnit
     * @param {AgeUnit} nextUnit
     */
    private onAgeUnitChange(ageRangeGroup: FormGroup, prevUnit: AgeUnit, nextUnit: AgeUnit) {

        const ageMax = ageRangeGroup.get("ageMax").value;
        const ageMin = ageRangeGroup.get("ageMin").value;
        const ageUnitInAgeUnit = new AgeUnitInAgeUnit();        

        ageRangeGroup.patchValue({
            ageMax: ageUnitInAgeUnit.transform(ageMax, prevUnit, nextUnit),
            ageMin: ageUnitInAgeUnit.transform(ageMin, prevUnit, nextUnit)
        })
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
            ageUnit: ageUnit
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
