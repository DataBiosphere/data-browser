import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Publications } from "./publications";

export default {
  component: Publications,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof Publications>;

const Template: ComponentStory<typeof Publications> = (args) => (
  <Publications {...args} />
);

export const ProjectPublications = Template.bind({});
ProjectPublications.args = {
  publications: [
    {
      doi: "10.1126/science.aay3224",
      officialHcaPublication: true,
      publicationTitle:
        "A cell atlas of human thymic development defines T cell repertoire formation.",
      publicationUrl: "https://www.science.org/doi/10.1126/science.aay3224",
    },
    {
      publicationTitle:
        "A revised airway epithelial hierarchy includes CFTR-expressing ionocytes.",
      publicationUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6295155/",
    },
  ],
};
