import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextLinks } from "./TextLinks";

export default {
  argTypes: {
    values: { control: "array" },
  },
  component: TextLinks,
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof TextLinks>;

const GOOGLE_URL = "https://google.com";

const Template: ComponentStory<typeof TextLinks> = (args) => (
  <TextLinks {...args} />
);

export const TextLinksKeyValuePairs = Template.bind({});
TextLinksKeyValuePairs.args = {
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
