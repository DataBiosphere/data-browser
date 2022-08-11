// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { FilterTags } from "./filterTags";

export default {
  argTypes: {
    tags: { control: { disable: true } },
  },
  component: FilterTags,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterTags",
} as ComponentMeta<typeof FilterTags>;

const Template: ComponentStory<typeof FilterTags> = (args) => (
  <FilterTags {...args} />
);

const onRemove = (): void => {
  // onRemove function
};

export const DonorDiseaseTags = Template.bind({});
DonorDiseaseTags.args = {
  tags: [
    {
      label: "Normal",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "abscess",
      onRemove: onRemove,
      superseded: true,
    },
    {
      label: "acoustic neuroma",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "acute kidney failure",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "acute kidney tubular necrosis",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "alcohol abuse",
      onRemove: onRemove,
      superseded: false,
    },
  ],
};

export const GenderTags = Template.bind({});
GenderTags.args = {
  tags: [
    {
      label: "Male",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "Female",
      onRemove: onRemove,
      superseded: true,
    },
    {
      label: "Unknown",
      onRemove: onRemove,
      superseded: false,
    },
  ],
};

export const ProjectTags = Template.bind({});
ProjectTags.args = {
  tags: [
    {
      label:
        "CCDG-Neuropsychiatric: Autism- Autism Genetic Resource Exchange (AGRE)",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label:
        "NHLBI TOPMed - NHGRI CCDG: Hispanic Community Health Study/Study of Latinos (HCHS/SOL)",
      onRemove: onRemove,
      superseded: true,
    },
    {
      label:
        "Center for Common Disease Genomics [CCDG] - Autoimmune: Inflammatory Bowel Disease (IBD) Exomes and Genomes",
      onRemove: onRemove,
      superseded: false,
    },
  ],
};
