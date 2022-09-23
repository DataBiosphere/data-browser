import { AnvilSourceItem } from "../../anvil/common/entities";

export const getStudyName = (source: AnvilSourceItem): string =>
  source.name ?? "";

export const getConsortia = (source: AnvilSourceItem): string =>
  source.consortium ?? "";

export const getDisease = (source: AnvilSourceItem): string =>
  source.diseaseText ?? "";

export const getDataType = (source: AnvilSourceItem): string[] => {
  return source["library:datatype"] ?? [];
};

export const getIndication = (source: AnvilSourceItem): string =>
  source["library:indication"] ?? "";

export const getStudyDesign = (source: AnvilSourceItem): string[] =>
  source["library:studyDesign"] ?? [];

export const getParticipantCount = (source: AnvilSourceItem): number =>
  source.participantCount ?? 0;
