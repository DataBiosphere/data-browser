/* tslint:disable:no-unused-variable */

import { TestBed, async } from "@angular/core/testing";
import { LocaleStringPipe } from "./locale-string.pipe";

describe("Pipe: LocaleString", () => {
    it("create an instance", () => {
        let pipe = new LocaleStringPipe();
        expect(pipe).toBeTruthy();
    });

    xit(`transforms 1000 to "1,000"`, () => {
        // TODO impossible with PhantomJS, `toLocaleString()` doesn't work.
        // https://github.com/ariya/phantomjs/issues/12581
        let pipe = new LocaleStringPipe();
        let value = 1000;
        let result = pipe.transform(value);
        expect(result).toBe("1,000");
    });
});
