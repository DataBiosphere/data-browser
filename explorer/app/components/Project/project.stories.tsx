// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { ProjectCitation } from "./components/Citation/citation.stories";
import { ProjectContacts } from "./components/Contacts/contacts.stories";
import { ProjectContributors } from "./components/Contributors/contributors.stories";
import { ProjectDataReleasePolicy } from "./components/DataReleasePolicy/dataReleasePolicy.stories";
import { ProjectDescription } from "./components/Description/description.stories";
import { ProjectHeader } from "./components/ProjectHeader/projectHeader.stories";
import { ProjectSupplementaryLinks } from "./components/SupplementaryLinks/supplementaryLinks.stories";
import { Project } from "./project";

export default {
  argTypes: {
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: Project,
  title: "Project",
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = (args) => (
  <Project {...args} />
);

export const View = Template.bind({});
View.args = {
  mainColumn: (
    <>
      <ProjectDescription
        projectDescription={
          ProjectDescription.args?.projectDescription || "None"
        }
      />
      <ProjectContacts {...ProjectContacts.args} />
      <ProjectContributors {...ProjectContributors.args} />
      <ProjectCitation {...ProjectCitation.args} />
      <ProjectSupplementaryLinks {...ProjectSupplementaryLinks.args} />
      <ProjectDataReleasePolicy />
    </>
  ),
  sideColumn: <div style={{ backgroundColor: "blue", height: 200 }}></div>,
  top: <ProjectHeader>{ProjectHeader.args?.children}</ProjectHeader>,
};
