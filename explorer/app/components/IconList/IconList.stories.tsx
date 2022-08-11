import { ComponentMeta, ComponentStory } from "@storybook/react";
import CellXGeneIcon from "images/icons/cellxgene.svg";
import StemIcon from "images/icons/stem.svg";
import UCSCCellIcon from "images/icons/ucsc-cell.svg";
import UCSCGenomeIcon from "images/icons/ucsc-genome.svg";
import React from "react";
import { IconList } from "./IconList";

export default {
  argTypes: {
    icons: { control: "array" },
  },
  component: IconList,
  title: "Components/SectionContent/Content/KeyValuePairs",
} as ComponentMeta<typeof IconList>;

const Template: ComponentStory<typeof IconList> = (args) => (
  <IconList {...args} />
);

export const IconListKeyValuePairs = Template.bind({});
IconListKeyValuePairs.args = {
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
