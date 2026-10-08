import { mapDiagnosisValue } from "../../site-config/anvil-cmg/dev/index/common/utils";

// Use a fixed lookup so a refresh of the generated names doesn't break these tests.
jest.mock("../../site-config/anvil-cmg/dev/index/common/diagnosis", () => ({
  DIAGNOSIS_DISPLAY_VALUE: {
    "HP:0000077": "Abnormality of the kidney",
    "OMIM:210210": "3-Methylcrotonyl-CoA carboxylase 2 deficiency",
    "OMIM:251290": "Band-like calcification with polymicrogyria",
  },
}));

describe("mapDiagnosisValue", () => {
  test("shows the name of a known term ID", () => {
    expect(mapDiagnosisValue("HP:0000077")).toBe(
      "Abnormality of the kidney (HP:0000077)"
    );
  });

  test("names each term ID in a value that holds several", () => {
    expect(mapDiagnosisValue("OMIM:210210;OMIM:251290")).toBe(
      "3-Methylcrotonyl-CoA carboxylase 2 deficiency (OMIM:210210); " +
        "Band-like calcification with polymicrogyria (OMIM:251290)"
    );
  });

  test("leaves unknown parts raw when other parts have names", () => {
    expect(mapDiagnosisValue("HP:0000077; OMIM:000000")).toBe(
      "Abnormality of the kidney (HP:0000077); OMIM:000000"
    );
  });

  test("returns values with no known term ID unchanged", () => {
    expect(mapDiagnosisValue("OMIM:000000")).toBe("OMIM:000000");
    expect(mapDiagnosisValue("Pleurisy; pleural effusion")).toBe(
      "Pleurisy; pleural effusion"
    );
  });
});
