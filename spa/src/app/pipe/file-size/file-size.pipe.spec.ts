/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Specs covering pipe for formatting file sizes.
 */


/* tslint:disable:no-unused-variable */

import { FileSizePipe } from "./file-size.pipe";

describe("Pipe: FileSize", () => {

    it("create an instance", () => {
        let pipe = new FileSizePipe();
        expect(pipe).toBeTruthy();
    });

    it(`formats 1024 bytes to "1.00 KB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 KB");
    });

    it(`formats 1024 kilobytes to "1.00 MB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 MB");
    });

    it(`formats 1024 Megabytes to "1.00 GB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 GB");
    });

    it(`formats "1.50 MB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * (1024 * 1.5);
        let result = pipe.transform(value);
        expect(result).toBe("1.50 MB");
    });

    it(`formats 1024 gigabytes to "1.00 TB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 TB");
    });

    it(`formats 1024 terabytes to "1.00 PB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 PB");
    });

    it(`formats 1024 exabytes to "1.00 EB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 EB");
    });

    it(`formats 1024 zettabytes to "1.00 ZB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 ZB");
    });

    it(`formats 1024 yottabytes to "1.00 YB"`, () => {
        let pipe = new FileSizePipe();
        let value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
        let result = pipe.transform(value);
        expect(result).toBe("1.00 YB");
    });
});
