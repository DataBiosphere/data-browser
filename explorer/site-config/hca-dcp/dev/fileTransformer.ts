import { concatStrings } from "app/utils/string";
import { FilesResponse } from "app/models/responses";
import * as C from "../../../app/components";
import { humanFileSize } from "app/utils/fileSize";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

/* eslint-disable sonarjs/no-duplicate-string -- ignoring duplicate strings here*/
export const filesToFileNameColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Links> => {
  if (!file.files?.[0]) {
    return {
      links: [],
    };
  }

  return {
    links: [
      {
        label: file.files[0].name,
        url: `/explore/files/${file.files[0].uuid}`,
      },
    ],
  };
};

export const filesToFileFormatColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files?.[0]) {
    return {};
  }

  return {
    children: file.files[0].format,
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const filesToProjTitleColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.projects?.[0]) {
    return {};
  }

  return {
    children: concatStrings(file.projects[0].projectTitle),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const filesToFileSizeColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files?.[0]) {
    return {};
  }

  return {
    children: humanFileSize(file.files[0].size),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const filesToContentDescColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files?.[0]) {
    return {};
  }

  return {
    children: concatStrings(file.files[0].contentDescription),
    customColor: "ink",
    variant: "text-body-400",
  };
};

export const filesToCellCountColumn = (
  file: FilesResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.projects?.[0].estimatedCellCount) {
    return {
      children: 0,
      customColor: "ink",
      variant: "text-body-400",
    };
  }

  return {
    children: formatter.format(file.projects[0].estimatedCellCount),
    customColor: "ink",
    variant: "text-body-400",
  };
};
/* eslint-enable sonarjs/no-duplicate-string -- watching for duplicate strings here */
