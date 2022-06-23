import { SampleResponse } from "app/models/responses";
import { concatStrings } from "app/utils/string";
import * as C from "../../../app/components";

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
