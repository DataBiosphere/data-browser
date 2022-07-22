import * as C from "../../../app/components";

import { AnvilSourceItem } from "app/models/responses";

const createColumn = (
  value: string | number = ""
): React.ComponentProps<typeof C.Text> => ({
  children: value,
  customColor: "ink",
  variant: "text-body-400",
});

export const workspaceToStudyNameColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source?.name);

export const workspaceToConsortiaColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source?.consortium);

export const workspaceToDiseaseColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source.diseaseText);

export const workspaceToDataTypeColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> =>
  createColumn(source["library:datatype"]);

export const workspaceToIndicationColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> =>
  createColumn(source["library:indication"]);

export const workspaceToStudyDesignColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> =>
  createColumn(source["library:studyDesign"]);

export const workspaceToParticipantsColumn = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source.participantCount);
