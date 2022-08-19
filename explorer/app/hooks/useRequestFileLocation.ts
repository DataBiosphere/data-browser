import {
  FileLocationResponse,
  FILE_LOCATION_PENDING,
  FILE_LOCATION_SUCCESSFULLY,
} from "app/apis/azul/common/entities";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useAsync } from "./useAsync";

export interface FileLocation {
  location: string;
  retryAfter?: number;
  status: number;
}

interface UseRequestFileLocationResult {
  data: FileLocation | undefined;
  isIdle: boolean;
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
 * @param active - Mutable object used to check if the page is still mounted and the requests should keep executing
 * @param retryAfter - timeout value
 */
const scheduleFileLocation = (
  url: string,
  resolve: ResolveFn,
  reject: RejectFn,
  active: MutableRefObject<boolean>,
  retryAfter = 0
): void => {
  setTimeout(() => {
    getFileLocation(url).then((result: FileLocation) => {
      if (result.status === FILE_LOCATION_PENDING) {
        if (!active.current) {
          reject({
            location: "",
            status: 499, //Client Closed Request
          });
          return;
        }
        scheduleFileLocation(
          result.location,
          resolve,
          reject,
          active,
          result.retryAfter
        );
      } else if (result.status === FILE_LOCATION_SUCCESSFULLY) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }, retryAfter * 1000);
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
    isIdle,
    isLoading,
    isSuccess,
    run: runAsync,
  } = useAsync<FileLocation>();
  const active = useRef(true);

  useEffect(
    () => () => {
      active.current = false;
    },
    []
  );

  const run = useCallback(() => {
    if (url) {
      runAsync(
        new Promise<FileLocation>((resolve, reject) => {
          scheduleFileLocation(url, resolve, reject, active);
        })
      );
    }
  }, [runAsync, url]);

  return { data, isIdle, isLoading, isSuccess, run };
};
