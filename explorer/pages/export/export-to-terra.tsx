import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Export to Terra",
    },
  };
};

/**
 * Export method page.
 * @returns export method view component.
 */
const ExportMethodPage = (): JSX.Element => {
  return <ExportMethodView />;
};

export default ExportMethodPage;
