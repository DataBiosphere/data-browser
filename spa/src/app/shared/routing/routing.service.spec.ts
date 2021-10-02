/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing routing service.
 */

// App dependencies
import { TestBed, waitForAsync } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { filter } from "rxjs/operators";

// Core dependencies
import { RoutingService } from "./routing.service";
import { FooComponent } from "../../test/foo.component";
import { BarComponent } from "../../test/bar.component";

describe("RoutingService", () => {

    let fixture;
    let router;
    let routingService: RoutingService;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                FooComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: "",
                        component: BarComponent
                    },
                    {
                        path: "foo",
                        component: FooComponent
                    }
                ])
            ],
            providers: [
                RoutingService
            ]
        });

        routingService = TestBed.inject(RoutingService);
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(FooComponent);
        fixture.ngZone.run(() => {
            router.initialNavigation();
        });
    }));

    describe("isPathActive", () => {

        /**
         * Matches path with no query string params
         */
        it("matches path with no query string params", (doneFn: DoneFn) => {

            const commands = ["/foo"];

            router.events.pipe(
                filter(evt => evt instanceof NavigationEnd)
            ).subscribe(() => {
                expect(routingService.isPathActive(commands)).toBeTrue();
                doneFn();
            });

            fixture.ngZone.run(() => {
                router.navigate(commands);
            });
        });

        /**
         * Ignores query string params when path matches.
         */
        it("ignores query string params on matching commands", (doneFn: DoneFn) => {

            const commands = ["/foo"];

            router.events.pipe(
                filter(evt => evt instanceof NavigationEnd)
            ).subscribe(() => {
                expect(routingService.isPathActive(commands)).toBeTrue();
                doneFn();
            });

            fixture.ngZone.run(() => {
                router.navigate(commands, {
                    queryParams: { foo: "bar" }
                });
            });
        });

        /**
         * Returns false on non-matching paths.
         */
        it("doesn't match different paths", (doneFn: DoneFn) => {

            const navigateToCommands = ["/foo"];
            const expectedCommands = [""];

            router.events.pipe(
                filter(evt => evt instanceof NavigationEnd)
            ).subscribe(() => {
                expect(routingService.isPathActive(expectedCommands)).toBeFalse();
                doneFn();
            });

            fixture.ngZone.run(() => {
                router.navigate(navigateToCommands);
            });
        });
    });
});
