import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import {
  processAggregatedBooleanOrArrayValue,
  processAggregatedOrArrayValue,
} from "../../app/apis/azul/common/utils";

interface MockResponseValue {
  data_modality?: (string | null)[] | null;
  is_supplementary?: (boolean | null)[];
}

describe("processAggregatedOrArrayValue", () => {
  test("lists a value repeated across entries once", () => {
    // Mirrors an AnVIL donor hit whose files are grouped by file format.
    const responseValues: MockResponseValue[] = [
      { data_modality: ["single-nucleus RNA sequencing assay"] },
      { data_modality: ["single-nucleus RNA sequencing assay"] },
      { data_modality: ["single-nucleus RNA sequencing assay"] },
    ];
    expect(
      processAggregatedOrArrayValue(responseValues, "data_modality")
    ).toEqual(["single-nucleus RNA sequencing assay"]);
  });

  test("keeps values in first-seen order", () => {
    const responseValues: MockResponseValue[] = [
      { data_modality: ["b", "a"] },
      { data_modality: ["c", "a"] },
      { data_modality: ["b", "d"] },
    ];
    expect(
      processAggregatedOrArrayValue(responseValues, "data_modality")
    ).toEqual(["b", "a", "c", "d"]);
  });

  test("removes null values alongside duplicates", () => {
    const responseValues: MockResponseValue[] = [
      { data_modality: [null, "a"] },
      { data_modality: ["a", null] },
      { data_modality: null },
    ];
    expect(
      processAggregatedOrArrayValue(responseValues, "data_modality")
    ).toEqual(["a"]);
  });

  test("returns unspecified when all values are null", () => {
    const responseValues: MockResponseValue[] = [
      { data_modality: [null] },
      { data_modality: [null] },
    ];
    expect(
      processAggregatedOrArrayValue(responseValues, "data_modality")
    ).toEqual([LABEL.UNSPECIFIED]);
  });

  test("returns unspecified for empty response values", () => {
    const responseValues: MockResponseValue[] = [];
    expect(
      processAggregatedOrArrayValue(responseValues, "data_modality")
    ).toEqual([LABEL.UNSPECIFIED]);
  });
});

describe("processAggregatedBooleanOrArrayValue", () => {
  test("lists a boolean value repeated across entries once", () => {
    const responseValues: MockResponseValue[] = [
      { is_supplementary: [false] },
      { is_supplementary: [true, false] },
      { is_supplementary: [true] },
    ];
    expect(
      processAggregatedBooleanOrArrayValue(responseValues, "is_supplementary")
    ).toEqual(["false", "true"]);
  });

  test("returns unspecified when all values are null", () => {
    const responseValues: MockResponseValue[] = [
      { is_supplementary: [null] },
      { is_supplementary: [null] },
    ];
    expect(
      processAggregatedBooleanOrArrayValue(responseValues, "is_supplementary")
    ).toEqual([LABEL.UNSPECIFIED]);
  });
});
