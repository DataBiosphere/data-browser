import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ProjectCitation } from "../Project/components/Citation/citation.stories";
import { ProjectCollaboratingOrganizations } from "../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { ProjectContacts } from "../Project/components/Contacts/contacts.stories";
import { ProjectContributors } from "../Project/components/Contributors/contributors.stories";
import { ProjectDataCurators } from "../Project/components/DataCurators/dataCurators.stories";
import { ProjectDataReleasePolicy } from "../Project/components/DataReleasePolicy/dataReleasePolicy.stories";
import { ProjectDescription } from "../Project/components/Description/description.stories";
import { ProjectDetails } from "../Project/components/Details/details.stories";
import { ProjectHero } from "../Project/components/Hero/hero.stories";
import { ProjectPublications } from "../Project/components/Publications/publications.stories";
import { ProjectSupplementaryLinks } from "../Project/components/SupplementaryLinks/supplementaryLinks.stories";
import { Detail } from "./detail";

export default {
  argTypes: {
    Tabs: { table: { disable: true } },
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: Detail,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/Detail",
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const HCAProjectDetail = Template.bind({});
HCAProjectDetail.args = {
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
