import {
  FileLocationResponse,
  FILE_LOCATION_PENDING,
  FILE_LOCATION_SUCCESSFULLY,
} from "app/apis/azul/common/entities";
import { useCallback } from "react";
import { useAsync } from "./useAsync";

export interface FileLocation {
  location: string;
  retryAfter?: number;
  status: number;
}

interface UseRequestFileLocationResult {
  data: FileLocation | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  run: () => void;
}

type ResolveFn = (file: FileLocation | PromiseLike<FileLocation>) => void;
type RejectFn = (reason: FileLocation) => void;

/**
 * Function to make a get request and map the result to camelCase
 * @param url - url for the get request
 * @returns @see FileLocation
 */
export const getFileLocation = async (url: string): Promise<FileLocation> => {
  const res = await fetch(url);
  const jsonRes: FileLocationResponse = await res.json();
  return {
    location: jsonRes.Location,
    retryAfter: jsonRes["Retry-After"],
    status: jsonRes.Status,
  };
};

/**
 * Function that will recursively keep making requests to get the file location until gets a 302 or an error.
 * @param url - url for the get request
 * @param resolve - function to resolve the running promise
 * @param reject - function to reject the running promise
 * @param retryAfter - timeout value
 */
const scheduleFileLocation = (
  url: string,
  resolve: ResolveFn,
  reject: RejectFn,
  retryAfter = 0
): void => {
  setTimeout(() => {
    getFileLocation(url).then((result: FileLocation) => {
      if (result.status === FILE_LOCATION_PENDING) {
        scheduleFileLocation(
          result.location,
          resolve,
          reject,
          result.retryAfter
        );
      } else if (result.status === FILE_LOCATION_SUCCESSFULLY) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }, retryAfter);
};

/**
 * Hook to get a file location using a retry-after approach
 * @param url - to be used on the get request
 * @returns data object with the file location
 */
export const useRequestFileLocation = (
  url?: string
): UseRequestFileLocationResult => {
  const {
    data,
    isLoading,
    isSuccess,
    run: runAsync,
  } = useAsync<FileLocation>();

  const run = useCallback(() => {
    if (url) {
      runAsync(
        new Promise<FileLocation>((resolve, reject) => {
          scheduleFileLocation(url, resolve, reject);
        })
      );
    }
  }, [runAsync, url]);

  return { data, isLoading, isSuccess, run };
};
