import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconList } from "./IconList";
import CellXGeneIcon from "images/icons/cellxgene.svg";
import StemIcon from "images/icons/stem.svg";
import UCSCCellIcon from "images/icons/ucsc-cell.svg";
import UCSCGenomeIcon from "images/icons/ucsc-genome.svg";

export default {
  argTypes: {
    icons: { control: "array" },
  },
  component: IconList,
  title: "Components/IconList",
} as ComponentMeta<typeof IconList>;

const Template: ComponentStory<typeof IconList> = (args) => (
  <IconList {...args} />
);

export const AnalysisPortals = Template.bind({});
AnalysisPortals.args = {
  icons: [
    {
      icon: {
        alt: "UCSC Genome Browser",
        path: UCSCGenomeIcon,
      },
      label: "UCSC Genome Browser",
    },
    {
      icon: {
        alt: "UCSC Cell Browser",
        path: UCSCCellIcon,
      },
      label: "UCSC Cell Browser",
    },
    {
      icon: {
        alt: "cellxgene",
        path: CellXGeneIcon,
      },
      label: "cellxgene",
    },
    {
      icon: {
        alt: "Stem Cell Hub",
        path: StemIcon,
      },
      label: "Stem Cell Hub",
    },
  ],
};
