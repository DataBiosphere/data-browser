import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: 'Download Selected Data Using "curl"',
    },
  };
};

/**
 * Download curl command page.
 * @returns download curl command view component.
 */
const GetCurlCommandPage = (): JSX.Element => {
  return <ExportMethodView />;
};

export default GetCurlCommandPage;
