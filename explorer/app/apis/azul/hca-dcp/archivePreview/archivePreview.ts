import { PROJECT_MATRIX_ARCHIVE_PREVIEW } from "./constants";

// Constants
const DATE_TZ = "GMT";

/**
 * View-specific model of a file associated with an archive project matrix.
 */
export interface ArchiveFile {
  fileName: string;
  fileSize: number;
  modified: string; // Date formatted for display
}

/**
 * Model of response of file associated with an archive project matrix.
 */
export interface ArchiveFileResponse {
  modified: string;
  name: string; // Date formatted for display
  size: number;
}

/**
 * Model of the response returned from requesting the set of files associated with a project matrix.
 */
export interface ArchivePreviewResponse {
  files: ArchiveFileResponse[];
}

/**
 * Fetch the archive preview for the given matrix.
 * @param browserURL - Browser URL.
 * @param matrixId - Matrix identifier.
 * @param matrixVersion - Matrix version.
 * @returns files associated with an archive project matrix.
 */
export async function fetchProjectMatrixArchiveFiles(
  browserURL: string,
  matrixId: string,
  matrixVersion: string
): Promise<ArchiveFile[]> {
  if (!matrixId || !matrixVersion) {
    return [];
  }
  const url = getProjectMatrixArchivePreviewUrl(
    browserURL,
    matrixId,
    matrixVersion
  );
  try {
    const response = await fetch(url);
    const result = await response.json();
    return bindArchiveFiles(result);
  } catch (error) {
    return [];
  }
}

/**
 * Bind the archive preview response to a set of archive file view objects.
 * @param response - Archive preview response.
 * @returns archive files.
 */
function bindArchiveFiles(response: ArchivePreviewResponse): ArchiveFile[] {
  return response.files.map((archiveFile) => {
    const { modified, name: fileName, size: fileSize } = archiveFile;
    const modifiedFormatted = formatDate(modified);
    return {
      fileName,
      fileSize,
      modified: modifiedFormatted,
    };
  });
}

/**
 * Formats date string to date "yyyy-MM-dd HH:mm 'GMT'".
 * @param dateStr - Date as string.
 * @returns formatted date.
 */
function formatDate(dateStr: string): string {
  const isoString = new Date(dateStr).toISOString();
  const [date, time] = isoString.split("T");
  const [hh, mm] = time.split(":");
  return `${date} ${hh}:${mm} ${DATE_TZ}`;
}

/**
 * Returns the project matrix archive preview URL for the given project matrix.
 * @param browserURL - Browser URL.
 * @param matrixId - Matrix identifier.
 * @param matrixVersion - Matrix version.
 * @returns project matrix archive preview URL.
 */
function getProjectMatrixArchivePreviewUrl(
  browserURL: string,
  matrixId: string,
  matrixVersion: string
): string {
  const sanitizedMatrixVersion = matrixVersion.replace(/:/g, "_");
  return `${browserURL}${PROJECT_MATRIX_ARCHIVE_PREVIEW}/${matrixId}-${sanitizedMatrixVersion}.json`;
}
