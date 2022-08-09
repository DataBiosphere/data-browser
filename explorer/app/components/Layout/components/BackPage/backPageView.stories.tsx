// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { BackPageView } from "./backPageView";
import { ProjectCitation } from "../../../Project/components/Citation/citation.stories";
import { ProjectCollaboratingOrganizations } from "../../../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { ProjectContacts } from "../../../Project/components/Contacts/contacts.stories";
import { ProjectContributors } from "../../../Project/components/Contributors/contributors.stories";
import { ProjectDataCurators } from "../../../Project/components/DataCurators/dataCurators.stories";
import { ProjectDataReleasePolicy } from "../../../Project/components/DataReleasePolicy/dataReleasePolicy.stories";
import { ProjectDescription } from "../../../Project/components/Description/description.stories";
import { ProjectDetails } from "../../../Project/components/Details/details.stories";
import { ProjectHero } from "../../../Project/components/Hero/hero.stories";
import { ProjectPublications } from "../../../Project/components/Publications/publications.stories";
import { ProjectSupplementaryLinks } from "../../../Project/components/SupplementaryLinks/supplementaryLinks.stories";

export default {
  argTypes: {
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: BackPageView,
  title: "Views/BackPage",
} as ComponentMeta<typeof BackPageView>;

const Template: ComponentStory<typeof BackPageView> = (args) => (
  <BackPageView {...args} />
);

export const Project = Template.bind({});
Project.args = {
  mainColumn: (
    <>
      <ProjectDescription
        projectDescription={
          ProjectDescription.args?.projectDescription || "None"
        }
      />
      <ProjectContacts {...ProjectContacts.args} />
      <ProjectPublications {...ProjectPublications.args} />
      <ProjectContributors {...ProjectContributors.args} />
      <ProjectCollaboratingOrganizations
        {...ProjectCollaboratingOrganizations.args}
      />
      <ProjectDataCurators {...ProjectDataCurators.args} />
      <ProjectCitation {...ProjectCitation.args} />
      <ProjectSupplementaryLinks {...ProjectSupplementaryLinks.args} />
      <ProjectDataReleasePolicy />
    </>
  ),
  sideColumn: (
    <>
      <ProjectDetails {...ProjectDetails.args} />
    </>
  ),
  top: (
    <>
      <ProjectHero {...ProjectHero.args} />
    </>
  ),
};
