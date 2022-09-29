/**
 * Model to represent anvil's catalog TSV file. Currently anvil/common/entities.ts is used.
 * TODO(Fran) review AnVIL catalog transformer types.
 */
export interface AnvilCatalogSourceItem {
  Access: string;
  "Consent Code": string;
  Consortium: string;
  "Data Type": string;
  "dbGap Id": string;
  Disease: string;
  Participants: number;
  Samples: number;
  "Size (TB)": number;
  Study: string;
  "Study Accession": string;
  "Study Design": string;
  "Terra Workspace Name": string;
}
