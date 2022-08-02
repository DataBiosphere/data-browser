/**
 * Model of a study in the NCPI catalog TSV file.
 */
export interface NPCICatalogSourceItem {
  "Consent Code": string;
  "Data Type": string;
  "dbGap Id": string;
  "Focus / Disease": string;
  Participants: number;
  Platform: string;
  Study: string;
  "Study Accession": string;
  "Study Design": string;
}
