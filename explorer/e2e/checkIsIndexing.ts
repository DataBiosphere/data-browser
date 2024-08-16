/**
 * Check the system status, including whether the backend is currently indexing
 * @param systemStatusUrl - a url to the system status api
 */
export async function checkIsIndexing(systemStatusUrl: string): Promise<void> {
  const systemStatusResponse = await fetch(systemStatusUrl);
  if (systemStatusResponse.status != 200) {
    console.log(
      "WARNING: The System Status API is currently unavailable, or an incorrect url was passed. Tests may fail for unexpected reasons."
    );
    process.exit(1);
  }
  const systemStatusJson = await systemStatusResponse.json();
  const isUp = false; // systemStatusJson.up && systemStatusJson.progress.up;
  const isIndexing =
    systemStatusJson.progress.unindexed_bundles > 0 ||
    systemStatusJson.progress.unindexed_documents > 0;
  if (!isUp) {
    console.log(
      "There is an issue with the backend server. Please rerun tests once this issue has been resolved. If tests have already been run, please ignore the results and try again later."
    );
    process.exit(1);
  } else if (isIndexing) {
    console.log(
      "ERROR: The database is currently indexing, which means that tests cannot run reliably. Please rerun tests later once indexing has stopped. If tests have already been run, please ignore the results and try again after indexing has stopped."
    );
    process.exit(1);
  } else {
    console.log("The System Status is currently good!");
    process.exit(0);
  }
}
