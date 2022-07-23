import * as C from "../../../app/components";

import { NPCICatalogSourceItem } from "app/models/responses";

const createColumn = (
  value: string | number = ""
): React.ComponentProps<typeof C.Text> => ({
  children: value,
  customColor: "ink",
  variant: "text-body-400",
});

export const workspaceToPlatformColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source?.Platform);

export const workspaceToStudyColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source?.Study);

export const workspaceToFocusDiseaseColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> =>
  createColumn(source?.["Focus / Disease"]);

export const workspaceToDataTypeColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source["Data Type"]);

export const workspaceToDbGapColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source["dbGap Id"]);

export const workspaceToStudyDesignColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source["Study Design"]);

export const workspaceToParticipantsColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> => createColumn(source.Participants);

export const workspaceToConsentCodeColumn = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Text> =>
  createColumn(source?.["Consent Code"]);
