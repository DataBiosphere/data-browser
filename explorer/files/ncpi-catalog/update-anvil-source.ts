import * as fs from "fs";
import { Platform } from "./constants";
import { DbGapId } from "./entities";
import {
  getPlatformStudiesStudyIds,
  sourcePath,
  updatePlatformStudiesAndReportNewStudies,
} from "./utils";

type AnVILJSONElement = {
  dbGapId: DbGapId;
};

const anVILPath = "anvil-catalog/out/anvil-studies.json";

async function updateAnVILSource(sourcePath: string): Promise<void> {
  // Get existing platform studies and study ids from the NCPI source tsv.
  const [platformStudies, studyIds] = await getPlatformStudiesStudyIds(
    sourcePath,
    Platform.ANVIL
  );

  // Get AnVIL studies.
  let anvilJson: AnVILJSONElement[];
  try {
    anvilJson = JSON.parse(fs.readFileSync(anVILPath, "utf-8"));
  } catch (err) {
    console.error(
      "AnVIL database not present at '/anvil-catalog/out/anvil-studies.json', please run 'npm run build-anvil-db' then try again."
    );
    return;
  }
  const anvilIds: DbGapId[] = [];
  for (const key in anvilJson) {
    anvilIds.push(anvilJson[key].dbGapId);
  }

  // Update platform studies and report new studies for the specified platform.
  updatePlatformStudiesAndReportNewStudies(
    Platform.ANVIL,
    platformStudies,
    anvilIds,
    studyIds,
    sourcePath
  );
}

updateAnVILSource(sourcePath);
