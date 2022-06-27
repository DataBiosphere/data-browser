import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Citations } from "./Citations";

export default {
  argTypes: {
    align: { control: "select", options: ["left", "right"] },
    citations: { control: "array" },
  },
  component: Citations,
  title: "Components/Citations",
} as ComponentMeta<typeof Citations>;

const Template: ComponentStory<typeof Citations> = (args) => (
  <Citations {...args} />
);

export const Cotributors = Template.bind({});
Cotributors.args = {
  citations: [
    {
      citation: "3",
      value: "Allon M Klein",
    },
    {
      value: "Amedeo Vetere",
    },
    {
      value: "Bridget K Wagner",
    },
    {
      citation: "1",
      value: "Gervaise H Henry (Computational Scientist)",
    },
  ],
};

export const Organizations = Template.bind({});
Organizations.args = {
  citations: [
    {
      align: "left",
      citation: "3",
      value: "Institute of Genetic Medicine",
    },
    {
      align: "left",
      value: "Institute of Cellular Medicine",
    },
    {
      align: "left",
      value: "Newcastle University",
    },
    {
      align: "left",
      value: "Wellcome Sanger Institute",
    },
  ],
};
