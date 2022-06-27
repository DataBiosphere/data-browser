import { SampleResponse } from "app/models/responses";
import { concatStrings } from "app/utils/string";
import * as C from "../../../app/components";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const samplesToSampleIDColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Links> => {
  if (!sample.samples?.[0]) {
    return {
      links: [],
    };
  }

  return {
    links: [
      {
        label: sample.samples[0].id,
        url: `/explore/samples/${sample.samples[0].id}`,
      },
    ],
  };
};

export const samplesToProjTitleColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.projects?.[0]) {
    return {};
  }

  return {
    children: concatStrings(sample.projects[0].projectTitle),
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const samplesToSpeciesColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.donorOrganisms) {
    return {};
  }

  return {
    children: concatStrings(
      sample.donorOrganisms.flatMap((orgnanism) => orgnanism.genusSpecies)
    ),
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const samplesToSampleTypeColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.samples?.[0]) {
    return {};
  }

  return {
    children: concatStrings(sample.samples[0].sampleEntityType),
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const samplesToLibConsApproachColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.protocols?.[0]?.libraryConstructionApproach) {
    return {};
  }

  return {
    children: concatStrings(sample.protocols[0].libraryConstructionApproach),
    variant: "text-body-400",
    customColor: "ink",
  };
};

export const samplesToAnatomicalEntityColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.samples?.[0]?.organ) {
    return {};
  }

  return {
    children: concatStrings(sample.samples[0].organ),
    variant: "text-body-400",
    customColor: "ink",
  };
};
export const samplesToDiseaseDonorColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.donorOrganisms?.[0]) {
    return {};
  }

  return {
    children: concatStrings(sample.donorOrganisms[0].disease),
    variant: "text-body-400",
    customColor: "ink",
  };
};
export const samplesToCellCountColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.projects?.[0].estimatedCellCount) {
    return {
      children: 0,
      variant: "text-body-400",
      customColor: "ink",
    };
  }

  return {
    children: formatter.format(sample.projects[0].estimatedCellCount),
    variant: "text-body-400",
    customColor: "ink",
  };
};
