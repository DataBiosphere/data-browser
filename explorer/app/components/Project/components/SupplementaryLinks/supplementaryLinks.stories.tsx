import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SupplementaryLinks } from "./supplementaryLinks";

export default {
  component: SupplementaryLinks,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof SupplementaryLinks>;

const Template: ComponentStory<typeof SupplementaryLinks> = (args) => (
  <SupplementaryLinks {...args} />
);

export const ProjectSupplementaryLinks = Template.bind({});
ProjectSupplementaryLinks.args = {
  supplementaryLinks: [
    "https://castelobranco.shinyapps.io/MSCtrl_CCA_18/",
    "https://ki.se/en/mbb/oligointernode",
    "https://cellxgene.cziscience.com/collections/c9706a92-0e5f-46c1-96d8-20e42467f287",
    "https://github.com/DeprezM/HCA_analysis",
    "https://tumor-toolbox.broadinstitute.org/",
    "http://dx.doi.org/10.6019/PXD011655",
    "https://github.com/agneantanaviciute/colonicepithelium",
    "https://developmentcellatlas.ncl.ac.uk/datasets/HCA_thymus/",
    "https://doi.org/10.5281/zenodo.3572421",
    "https://www.gutcellatlas.org/",
    "https://czi-pbmc-cite-seq.jax.org/",
  ],
};
