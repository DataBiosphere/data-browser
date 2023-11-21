import { projectEdits } from "../../app/viewModelBuilders/azul/hca-dcp/common/projectMapper/projectEdits/constants";
import { writeAsJSON } from "../common/utils";

console.log("Building HCA Data Portal Overrides");
export {};

async function buildOverrides(): Promise<void> {
  await writeAsJSON(
    "hca-dcp/overrides.json",
    Object.fromEntries(projectEdits.entries())
  );
}

buildOverrides();
