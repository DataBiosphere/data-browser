import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Section } from "./Section";

export default {
  title: "Components/Section",
  component: Section,
  argTypes: {
    title: { control: "text" },
    children: { controle: "object" },
  },
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Project description",
  children: (
    <p>
      A comprehensive cellular anatomy of normal human prostate is essential for
      solving the cellular origins of benign prostatic hyperplasia and prostate
      cancer. The tools used to analyze the contribution of individual cell
      types are not robust. We provide a cellular atlas of the young adult human
      prostate and prostatic urethra using an iterative process of single-cell
      RNA sequencing (scRNA-seq) and flow cytometry on 98,000 cells taken from
      different anatomical regions. Immunohistochemistry with newly derived cell
      type-specific markers revealed the distribution of each epithelial and
      stromal cell type on whole mounts, revising our understanding of zonal
      anatomy. Based on discovered cell surface markers, flow cytometry antibody
      panels were designed to improve the purification of each cell type, with
      each gate confirmed by scRNA-seq. The molecular classification, anatomical
      distribution, and purification tools for each cell type in the human
      prostate create a powerful resource for experimental design in human
      prostate disease.
    </p>
  ),
};
