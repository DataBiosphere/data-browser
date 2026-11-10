import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";
import NextError from "next/error";
import { JSX } from "react";
import { ROUTES } from "../../site-config/anvil-cmg/dev/export/routes";
import { isUnavailablePlatformExportRoute } from "../../site-config/anvil-cmg/dev/export/utils";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageDescription: "Export selected data to CAVATICA for analysis.",
      pageTitle: "Export to CAVATICA",
    },
  };
};

/**
 * Export method page for CAVATICA.
 * @returns export method view component, or a 404 when the platform has no import endpoint.
 */
const ExportMethodPage = (): JSX.Element => {
  if (isUnavailablePlatformExportRoute(ROUTES.CAVATICA))
    return <NextError statusCode={404} />;
  return <ExportMethodView />;
};

export default ExportMethodPage;
