import { humanFileSize } from "../../app/utils/fileSize";

describe("humanFileSize", () => {
  it.each([
    [0, "0 B"],
    [512, "512 B"],
    [2048, "2 kB"],
    [1536, "1.5 kB"],
    [5 * 1024 ** 3, "5 GB"],
  ])("formats %d bytes as %s", (size, expected) => {
    expect(humanFileSize(size)).toBe(expected);
  });
});
