import { JSX } from "react";
import { ExportMethodView } from "@databiosphere/findable-ui/lib/views/ExportMethodView/exportMethodView";
import { GetStaticProps } from "next";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { FEATURES } from "../../app/shared/entities";
import Error from "next/error";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Export to CAVATICA",
    },
  };
};

/**
 * Export method page for CAVATICA.
 * @returns export method view component.
 */
const ExportMethodPage = (): JSX.Element => {
  const isEnabled = useFeatureFlag(FEATURES.NCPI_EXPORT);

  if (!isEnabled) return <Error statusCode={404} />;

  return <ExportMethodView />;
};

export default ExportMethodPage;
