/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for AnVIL dashboard file system methods.
 */

import { CastingContext, parse as parseCsv } from "csv-parse/sync";
import fs from "fs";

type ReturnType = string | number | boolean;

type FieldKey = string;

/**
 * Returns the file contents parsed into a model shaped by FIELD, or as row arrays if FIELD is omitted.
 *
 * @param content - to be parsed
 * @param delimiter - csv delimiter
 * @param FIELD - fields
 * @param FIELD_TYPE - field types
 * @returns @see ReturnType[]
 */
export const parseContentRows = async function parseContentRows<T>(
  content: Buffer | string,
  delimiter = ",",
  FIELD: { [key: FieldKey]: string },
  FIELD_TYPE: { [key: FieldKey]: string }
): Promise<T[]> {
  if (!FIELD) return parseCsv(content, { delimiter, relax_quotes: true });
  const keyTypes = Object.fromEntries(
    Object.entries(FIELD_TYPE).map(([header, type]) => [FIELD[header], type])
  );
  return parseCsv(content, {
    cast: (datum: string, info: CastingContext) =>
      info.header ? datum : parseDatumValue(datum, keyTypes[info.column]),
    columns: (row: string[]) => row.map((header: string) => header),
    delimiter,
    relax_quotes: true,
  });
};

/**
 * Reads the contents of the specified directory and returns an array of file names.
 * @param dir - Directory.
 * @param options - Options.
 * @returns an array of file names for the specified directory.
 */
export const readDir = async function readDir(
  dir: string,
  options = null
): Promise<string[] | undefined> {
  try {
    return fs.readdirSync(dir, options);
    // eslint-disable-next-line no-empty -- copied from readFile function
  } catch {}
};

/**
 * Returns the file content for the specified file.
 * @param file - file's path
 * @param options - file's options
 * @returns the file content for the specified file.
 */
export const readFile = async function readFile(
  file: string,
  options = null
): Promise<Buffer | undefined> {
  try {
    // const filePath = path.resolve(__dirname, file);
    // const jsonDirectory = path.join(process.cwd(), "files");
    const jsonDirectory = process.cwd();
    return fs.readFileSync(jsonDirectory + "/" + file, options);
    // eslint-disable-next-line no-empty -- copied from anvil-portal
  } catch {}
};

/**
 * Returns the datum formatted as a string array.
 *
 * @param datum - CSV data
 * @returns data formatted as array
 */
function formatDatumAsArray(datum: string): ReturnType[] {
  if (datum) {
    const initialValue: string[] = [];
    return datum.split(",").reduce((acc, val) => {
      const str = val.trim();

      if (str) {
        acc.push(str);
      }

      return acc;
    }, initialValue);
  }

  return [];
}

/**
 * Returns the datum formatted as a number.
 *
 * @param datum - CSV data
 * @returns data formatted as number
 */
function formatDatumAsNumber(datum: string): number {
  if (!datum) {
    return 0;
  }

  const value = datum.replace(/,/g, "");

  return Number(value);
}

/**
 * Returns the datum formatted as a string.
 * @param datum - CSV data
 * @returns string value
 */
function formatDatumAsString(datum: string): string {
  if (datum) {
    return datum.trim();
  }

  return "";
}

/**
 * Returns the datum formatted as a boolean.
 * @param datum - CSV data
 * @returns boolean value
 */
function formatDatumAsBoolean(datum: string): boolean {
  if (datum) {
    return datum.toLowerCase() === "true";
  }

  return false;
}

/**
 * Returns the datum, corrected for type.
 * i.e. will return a number as Number, instead of a string.
 * @param datum - CSV data
 * @param fieldType - field type
 * @returns formatted data
 */
function parseDatumValue(
  datum: string,
  fieldType: string
): ReturnType | ReturnType[] {
  /* Format datum as number. */
  if (fieldType === "number") {
    return formatDatumAsNumber(datum);
  }

  /* Format datum as array. */
  if (fieldType === "array") {
    return formatDatumAsArray(datum);
  }

  if (fieldType === "string") {
    return formatDatumAsString(datum);
  }

  if (fieldType === "boolean") {
    return formatDatumAsBoolean(datum);
  }

  return datum;
}
