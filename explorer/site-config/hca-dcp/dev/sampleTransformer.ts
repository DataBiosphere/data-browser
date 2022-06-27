import { SampleResponse } from "app/models/responses";
import { concatStrings } from "app/utils/string";
import * as C from "../../../app/components";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

/* eslint-disable sonarjs/no-duplicate-string -- ignoring duplicate strings here */
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
    customColor: "ink",
    variant: "text-body-400",
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
    customColor: "ink",
    variant: "text-body-400",
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
    customColor: "ink",
    variant: "text-body-400",
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
    customColor: "ink",
    variant: "text-body-400",
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
    customColor: "ink",
    variant: "text-body-400",
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
    customColor: "ink",
    variant: "text-body-400",
  };
};
export const samplesToCellCountColumn = (
  sample: SampleResponse
): React.ComponentProps<typeof C.Text> => {
  if (!sample.projects?.[0].estimatedCellCount) {
    return {
      children: 0,
      customColor: "ink",
      variant: "text-body-400",
    };
  }

  return {
    children: formatter.format(sample.projects[0].estimatedCellCount),
    customColor: "ink",
    variant: "text-body-400",
  };
};
/* eslint-enable sonarjs/no-duplicate-string -- watching for duplicate strings here */
