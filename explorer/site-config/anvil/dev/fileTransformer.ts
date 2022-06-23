import { concatStrings } from "app/utils/string";
import { AnvilFileResponse } from "app/models/responses";
import * as C from "../../../app/components";

export const filesToDatasetNameColumn = (
  file: AnvilFileResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files) {
    return {};
  }

  return {
    children: file.datasets[0].dataset_name,
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const filesToFileFormatColumn = (
  file: AnvilFileResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files) {
    return {};
  }

  return {
    children: file.files[0].file_format,
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const filesToFileIdColumn = (
  file: AnvilFileResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files) {
    return {};
  }

  return {
    children: file.files[0].file_id,
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const filesToFileTypeColumn = (
  file: AnvilFileResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files) {
    return {};
  }

  return {
    children: file.files[0].file_type,
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const filesToDataModalityColumn = (
  file: AnvilFileResponse
): React.ComponentProps<typeof C.Text> => {
  if (!file.files?.[0]) {
    return {};
  }

  return {
    children: concatStrings(file.files[0].data_modality),
    variant: "text-body-400",
    customColor: "ink",
  };
};
