import { ExportView as ExportPageView } from "@databiosphere/findable-ui/lib/views/ExportView/exportView";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Choose Export Method",
    },
  };
};

/**
 * Export page.
 * @returns Element rendered as export page.
 */
const ExportPage = (): JSX.Element => {
  return <ExportPageView />;
};

export default ExportPage;
