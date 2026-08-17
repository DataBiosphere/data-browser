import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";
import { JSX } from "react";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageDescription: "Export selected data to NHLBI BioData Catalyst.",
      pageTitle: "Export to NHLBI BioData Catalyst",
    },
  };
};

/**
 * Export method page for BioData Catalyst.
 * @returns export method view component.
 */
const ExportMethodPage = (): JSX.Element => {
  return <ExportMethodView />;
};

export default ExportMethodPage;
