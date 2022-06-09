import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextLinks } from "./TextLinks";

export default {
  title: "Components/TextLinks",
  component: TextLinks,
  argTypes: {
    values: { control: "array" },
  },
} as ComponentMeta<typeof TextLinks>;

const Template: ComponentStory<typeof TextLinks> = (args) => (
  <TextLinks {...args} />
);

export const Accessions = Template.bind({});
Accessions.args = {
  values: [
    {
      text: "Array Express Accessions: ",
      link: {
        url: "https://google.com",
        label: "E-MTAB-8581",
      },
    },
    {
      text: "INSDC Project Accessions: ",
      link: {
        url: "https://google.com",
        label: "ERP119282",
      },
    },
    {
      text: "INSDC Study Accessions: ",
      link: {
        url: "https://google.com",
        label: "PRJEB36131",
      },
    },
  ],
};

export const DataReleasePolicy = Template.bind({});
DataReleasePolicy.args = {
  values: [
    {
      text: "For information regarding data sharing and data use, please see our ",
      link: {
        url: "https://google.com",
        label: "HCA Data Release Policy",
      },
    },
  ],
};
