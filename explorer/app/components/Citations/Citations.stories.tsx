import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Citations } from "./Citations";

export default {
  title: "Components/Citations",
  component: Citations,
  argTypes: {
    citations: { control: "array" },
    align: { control: "select", options: ["left", "right"] },
  },
} as ComponentMeta<typeof Citations>;

const Template: ComponentStory<typeof Citations> = (args) => (
  <Citations {...args} />
);

export const Cotributors = Template.bind({});
Cotributors.args = {
  citations: [
    {
      value: "Allon M Klein",
      citation: "3",
    },
    {
      value: "Amedeo Vetere",
    },
    {
      value: "Bridget K Wagner",
    },
    {
      value: "Gervaise H Henry (Computational Scientist)",
      citation: "1",
    },
  ],
};

export const Organizations = Template.bind({});
Organizations.args = {
  citations: [
    {
      value: "Institute of Genetic Medicine",
      citation: "3",
      align: "left",
    },
    {
      value: "Institute of Cellular Medicine",
      align: "left",
    },
    {
      value: "Newcastle University",
      align: "left",
    },
    {
      value: "Wellcome Sanger Institute",
      align: "left",
    },
  ],
};
