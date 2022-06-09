import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconList } from "./IconList";
import CellXGeneIcon from "../../../images/icons/cellxgene.svg";
import StemIcon from "../../../images/icons/stem.svg";
import UCSCCellIcon from "../../../images/icons/ucsc-cell.svg";
import UCSCGenomeIcon from "../../../images/icons/ucsc-genome.svg";

export default {
  title: "Components/IconList",
  component: IconList,
  argTypes: {
    icons: { control: "array" },
  },
} as ComponentMeta<typeof IconList>;

const Template: ComponentStory<typeof IconList> = (args) => (
  <IconList {...args} />
);

export const AnalysisPortals = Template.bind({});
AnalysisPortals.args = {
  icons: [
    {
      label: "UCSC Genome Browser",
      icon: {
        alt: "UCSC Genome Browser",
        path: UCSCGenomeIcon,
      },
    },
    {
      label: "UCSC Cell Browser",
      icon: {
        alt: "UCSC Cell Browser",
        path: UCSCCellIcon,
      },
    },
    {
      label: "Cellxgene",
      icon: {
        alt: "Cellxgene",
        path: CellXGeneIcon,
      },
    },
    {
      label: "Stem Cell Hub",
      icon: {
        alt: "Stem Cell Hub",
        path: StemIcon,
      },
    },
  ],
};
