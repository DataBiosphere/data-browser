/**
 * @jest-environment node
 */
import { parseContentRows } from "../../app/utils/tsvParser";

const FIELD = {
  ACTIVE: "Active",
  COUNT: "Count",
  NAME: "Name",
  SIZE: "Size",
  TAGS: "Tags",
};

const FIELD_TYPE = {
  ACTIVE: "boolean",
  COUNT: "number",
  NAME: "string",
  SIZE: "string",
  TAGS: "array",
};

// Tab-delimited, with a stray quote in an unquoted value and empty "Count" and "Tags" cells.
const TSV = [
  "Name\tCount\tActive\tSize\tTags",
  'alpha\t1,234\tTRUE\t  12" ruler  \ta, b,,c',
  "beta\t\tfalse\tplain\t",
].join("\n");

interface Row {
  Active: boolean;
  Count: number;
  Name: string;
  Size: string;
  Tags: string[];
}

/**
 * Parses the test TSV the way the catalog and consent code builds do.
 * @returns parsed rows.
 */
async function parseRows(): Promise<Row[]> {
  return parseContentRows<Row>(TSV, "\t", FIELD, FIELD_TYPE);
}

describe("parseContentRows", () => {
  test("uses the header row as each row's keys", async () => {
    const rows = await parseRows();
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(Object.keys(row)).toEqual([
        "Name",
        "Count",
        "Active",
        "Size",
        "Tags",
      ]);
    }
  });

  test("casts values by field type", async () => {
    const [alpha, beta] = await parseRows();
    expect(alpha.Count).toBe(1234);
    expect(alpha.Active).toBe(true);
    expect(beta.Active).toBe(false);
    expect(alpha.Name).toBe("alpha");
  });

  test("keeps a stray quote in an unquoted value and trims the string", async () => {
    const [alpha] = await parseRows();
    expect(alpha.Size).toBe('12" ruler');
  });

  test("parses an empty number cell as 0", async () => {
    const [, beta] = await parseRows();
    expect(beta.Count).toBe(0);
  });

  test("splits an array cell on commas, trims and drops empties", async () => {
    const [alpha, beta] = await parseRows();
    expect(alpha.Tags).toEqual(["a", "b", "c"]);
    expect(beta.Tags).toEqual([]);
  });

  test("returns the full rows", async () => {
    expect(await parseRows()).toEqual([
      {
        Active: true,
        Count: 1234,
        Name: "alpha",
        Size: '12" ruler',
        Tags: ["a", "b", "c"],
      },
      { Active: false, Count: 0, Name: "beta", Size: "plain", Tags: [] },
    ]);
  });
});
