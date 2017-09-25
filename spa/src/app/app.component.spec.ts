// /* tslint:disable:no-unused-variable */
//
// import { TestBed, async, ComponentFixture } from "@angular/core/testing";
// import { BrowserModule } from "@angular/platform-browser";
// import { RouterTestingModule } from "@angular/router/testing";
// import { AppComponent } from "./app.component";
// import { StoreModule } from "@ngrx/store";
// import { routes } from "./app.routes";
// //import { reducers } from "./shared";
// //TODO fix
//
// describe("App: Boardwalk", () => {
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 BrowserModule,
//                 RouterTestingModule.withRoutes(routes),
//                // StoreModule.provideStore(reducers)
//             ],
//             declarations: [
//                 AppComponent
//             ],
//         });
//     });
//
//     it("should create the app", async(() => {
//         let fixture = TestBed.createComponent(AppComponent);
//         let app = fixture.debugElement.componentInstance;
//         expect(app).toBeTruthy();
//     }));
//
//     it(`should have as title "Boardwalk"`, async(() => {
//         let fixture = TestBed.createComponent(AppComponent);
//         let app = fixture.debugElement.componentInstance;
//         expect(app.title).toEqual("Boardwalk");
//     }));
//
//     it("should render title in a h1 tag", async(() => {
//         let fixture = TestBed.createComponent(AppComponent);
//         fixture.detectChanges();
//         let compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelector("h1 span").textContent).toContain("Boardwalk");
//     }));
// });
