// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { NTagCell } from "./nTagCell";

export default {
  argTypes: {
    label: { control: "text" },
    values: { control: "array" },
  },
  component: NTagCell,
  title: "Components/Table/Cell/NTagCell",
} as ComponentMeta<typeof NTagCell>;

const Template: ComponentStory<typeof NTagCell> = (args) => (
  <NTagCell {...args} />
);

export const SpeciesNTagCell = Template.bind({});
SpeciesNTagCell.args = {
  label: "species",
  values: ["Homo sapiens", "Mus musculus"],
};

export const DiseaseNTagCell = Template.bind({});
DiseaseNTagCell.args = {
  label: "diseases",
  values: [
    "bacterial infectious disease with sepsis",
    "bronchopneumonia",
    "heart failure",
    "intestinal obstruction",
    "multiple sclerosis",
    "normal",
    "ovarian cancer",
    "rheumatoid arthritis",
    "tongue squamous cell carcinoma",
  ],
};
