import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { useFileManifestState } from "@databiosphere/findable-ui/lib/hooks/useFileManifestState";
import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";
import NextError from "next/error";
import { JSX } from "react";
import { isProductionEnvironment } from "../../app/config/utils";
import { hasNRESConsentGroup } from "../../app/viewModelBuilders/azul/anvil-cmg/common/viewModelBuilders";

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
  const { config } = useConfig();
  const { fileManifestState } = useFileManifestState();
  const isAnVIL = config.appTitle?.includes("AnVIL");

  // Curl download requires NRES consent group (AnVIL production only)
  if (
    isAnVIL &&
    isProductionEnvironment() &&
    !hasNRESConsentGroup(fileManifestState)
  ) {
    return <NextError statusCode={404} />;
  }

  return <ExportMethodView />;
};

export default GetCurlCommandPage;
