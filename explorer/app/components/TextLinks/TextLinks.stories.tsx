import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextLinks } from "./TextLinks";

export default {
  argTypes: {
    values: { control: "array" },
  },
  component: TextLinks,
  title: "Components/TextLinks",
} as ComponentMeta<typeof TextLinks>;

const GOOGLE_URL = "https://google.com";

const Template: ComponentStory<typeof TextLinks> = (args) => (
  <TextLinks {...args} />
);

export const Accessions = Template.bind({});
Accessions.args = {
  values: [
    {
      link: {
        label: "E-MTAB-8581",
        url: GOOGLE_URL,
      },
      text: "Array Express Accessions: ",
    },
    {
      link: {
        label: "ERP119282",
        url: GOOGLE_URL,
      },
      text: "INSDC Project Accessions: ",
    },
    {
      link: {
        label: "PRJEB36131",
        url: GOOGLE_URL,
      },
      text: "INSDC Study Accessions: ",
    },
  ],
};

export const DataReleasePolicy = Template.bind({});
DataReleasePolicy.args = {
  values: [
    {
      link: {
        label: "HCA Data Release Policy",
        url: GOOGLE_URL,
      },
      text: "For information regarding data sharing and data use, please see our ",
    },
  ],
};
