import { JSX } from "react";
import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { GetStaticProps } from "next";
import NextError from "next/error";
import { FEATURES } from "../../app/shared/entities";

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
  const isAnVIL = config.appTitle?.includes("AnVIL");
  const isEnabled = useFeatureFlag(FEATURES.CURL_DOWNLOAD);
  // Feature flag only applies to AnVIL sites
  if (isAnVIL && !isEnabled) return <NextError statusCode={404} />;
  return <ExportMethodView />;
};

export default GetCurlCommandPage;
