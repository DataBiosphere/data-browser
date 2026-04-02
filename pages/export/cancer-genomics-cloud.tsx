import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";
import { JSX } from "react";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Export to Cancer Genomics Cloud",
    },
  };
};

/**
 * Export method page for Cancer Genomics Cloud.
 * @returns export method view component.
 */
const ExportMethodPage = (): JSX.Element => {
  return <ExportMethodView />;
};

export default ExportMethodPage;
