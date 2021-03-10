/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing routing service.
 */

// App dependencies
import { async, TestBed } from "@angular/core/testing";
import { NavigationEnd, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { filter } from "rxjs/operators";

// Core dependencies
import { RoutingService } from "./routing.service";
import { FooComponent } from "../../test/foo.component";

describe("RoutingService", () => {

    let router;
    let routingService: RoutingService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                FooComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: "",
                        component: FooComponent
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
            
            router.navigate(commands);
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

            router.navigate(commands, {
                queryParams: { foo: "bar" }
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

            router.navigate(navigateToCommands);
        });
    });
});
