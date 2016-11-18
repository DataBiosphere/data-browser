/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { BoardwalkComponent } from "./boardwalk.component";
import { StoreModule } from "@ngrx/store";
import { boardwalkRoutes } from "./boardwalk.routes";
import { boardWalkReducers } from "./shared";

describe("App: Boardwalk", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                RouterTestingModule.withRoutes(boardwalkRoutes),
                StoreModule.provideStore(boardWalkReducers)
            ],
            declarations: [
                BoardwalkComponent
            ],
        });
    });

    it("should create the app", async(() => {
        let fixture = TestBed.createComponent(BoardwalkComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title "Boardwalk"`, async(() => {
        let fixture = TestBed.createComponent(BoardwalkComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("Boardwalk");
    }));

    it("should render title in a h1 tag", async(() => {
        let fixture = TestBed.createComponent(BoardwalkComponent);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1 span").textContent).toContain("Boardwalk");
    }));
});
